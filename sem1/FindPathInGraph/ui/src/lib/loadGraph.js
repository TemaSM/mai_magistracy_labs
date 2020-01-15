const request = require('./request');
const endpoint = 'static/'
const createGraph = require('ngraph.graph');
const BBox = require('../BBox');

const asyncFor = require('rafor');


module.exports = loadPositions;

function loadPositions(fileName, progress) {
  let graph = createGraph();
  let points;
  let links;
  let graphBBox = new BBox();

  // return new Promise((resolve) => {
  //   graph.addNode(1, { x: -100, y: 0 });
  //   graph.addNode(2, { x: 100, y: 0 });
  //   graph.addLink(1, 2);
  //   points = [-100, 0, 100, 0];
  //   links = [1, 2]
  //   graphBBox.addPoint(-100, 0)
  //   graphBBox.addPoint(100, 0)

  //   progress.pointsReady = true;
  //   progress.linksReady = true;
  //   resolve({graph, points, links, graphBBox});
  // })
  return request(endpoint + `/${fileName}.co.bin`, {
    responseType: 'arraybuffer',
    progress: reportProgress('Загрузка координат пересечений')
  })
    .then(setPositions)
    .then(loadLinks)
    .then(() => {
      return {
        graph, points, links, graphBBox
      }
    });

  function setPositions(buffer) {
    points = new Int32Array(buffer);
    console.log('Downloaded nodes: ' + points.length / 2);

    return initNodes(points);
  }

  function initNodes(points) {
    console.time('Добавление узлов на граф');
    progress.message = 'Добавление узлов на граф'

    return new Promise((resolve) => {
      asyncFor(points, addPointToGraph, () => {
        progress.pointsReady = true;
        console.timeEnd('Добавление узлов на граф');
        resolve();
      }, { step: 2 });

      progress.pointsReady = true;
    });
  }

  function addPointToGraph(x, i, points) {
    let nodeId = Math.floor(i / 2);
    let y = points[i + 1];
    graph.addNode(nodeId, { x, y })
    graphBBox.addPoint(x, y);

    if (i % 500 === 0) {
      progress.completed = Math.round(100 * i / points.length) + '%';
    }
  }


  function loadLinks() {
    return request(endpoint + `/${fileName}.gr.bin`, {
      responseType: 'arraybuffer',
      progress: reportProgress('Загрузка графа дорог')
    }).then(setLinks)
  }

  function setLinks(buffer) {
    links = new Int32Array(buffer);

    progress.message = 'Добавление соединений на граф'
    console.time('Добавление соединений на граф');
    return new Promise((resolve) => {
      asyncFor(links, addLinkToGraph, () => {
        console.timeEnd('Добавление соединений на граф');
        progress.linksReady = true;
        console.log(graph.getLinksCount() + ' edges; ' + graph.getNodesCount() + ' nodes.')
        resolve();
      }, { step: 2 });
    });
  }

  function addLinkToGraph(fromShifted, i, links) {
    let fromId = fromShifted - 1;
    let toId = links[i + 1] - 1;

    graph.addLink(fromId, toId);

    if (i % 500 === 0) {
      progress.completed = Math.round(100 * i / links.length) + '%';
    }
  }


  function reportProgress(name) {
    return function (e) {
      progress.message = name;
      progress.completed = Math.round(e.percent * 100) + '%';
    };
  }
}
