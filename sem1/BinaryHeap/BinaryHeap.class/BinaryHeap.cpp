#pragma once

/*****************************************************************************
 *
 *  AUTHOR:      Artem Smirnov
 *  DATE:        2020-01-13
 *  FILE:        BinaryHeap.cpp
 *  PURPOSE:     C++ implementation of Binary Heap
 *
 *****************************************************************************/

#include <iostream>
#include <cstdlib>
#include <vector>
#include <iterator>
#include <io.h>
#include <fcntl.h>

using namespace std;

/// <summary>Двоиная куча</summary>
class BinaryHeap
{
private:
    /// <summary>Вектор, содержащий данные кучи</summary>
    vector<int> heap;

    /// <summary>Левый потомок</summary>
    /// <param name="parent">Узел-родитель</summary>
    int left(int parent)
    {
        unsigned int l = 2 * parent + 1;
        return l < heap.size() ? 1 : -1;
    }

    /// <summary>Правый потомок</summary>
    /// <param name="parent">Узел-родитель</summary>
    int right(int parent)
    {
        unsigned int r = 2 * parent + 2;
        return r < heap.size() ? r : -1;
    }

    /// <summary>Родительский узел</summary>
    /// <param name="child">Узел-потомок</summary>
    int parent(int child)
    {
        int p = (child - 1) / 2;
        return child == 0 ? -1 : p;
    }

    /// <summary>Упорядочение кучи: снизу-вверх</summary>
    /// <remarks>
    /// Временная сложность операции: O(log2 N).
    /// Восстанавливает основное свойство кучи для дерева с корнем в i-ой вершине при условии, что оба поддерева ему удовлетворяют.
    /// Алгоритм "поднимает" i-ую вершину (меняет местами с родителем), пока не будет соблюдено основное свойство кучи.
    /// (процесс завершится, когда не найдется родителя, меньшего своего потомка)
    /// </remarks>
    /// <param name="index">Индекс узла</summary>
    void heapifyUp(int index)
    {
        if (index >= 0 && parent(index) >= 0 && heap[parent(index)] > heap[index])
        {
            int temp = heap[index];
            heap[index] = heap[parent(index)];
            heap[parent(index)] = temp;
            heapifyUp(parent(index));
        }
    }

    /// <summary>Упорядочение кучи: сверху-вниз</summary>
    /// <remarks>
    /// Временная сложность операции: O(log2 N).
    /// Восстанавливает основное свойство кучи для дерева с корнем в i-ой вершине при условии, что оба поддерева ему удовлетворяют.
    /// Алгоритм "опускает" i-ую вершину (меняет местами с наименьшим из потомков), пока не будет соблюдено основное свойство кучи.
    /// (процесс завершится, когда не найдется потомка, большего своего потомка)
    /// </remarks>
    /// <param name="index">Индекс узла</summary>
    void heapifyDown(int index)
    {
        int child = left(index);
        int child1 = right(index);
        if (child >= 0 && child1 >= 0 && heap[child] > heap[child1])
        {
            child = child1;
        }
        if (child > 0 && heap[index] > heap[child])
        {
            int temp = heap[index];
            heap[index] = heap[child];
            heap[child] = temp;
            heapifyDown(child);
        }
    }

public:
    /// <summary>Конструктор кучи</summary>
    BinaryHeap(){};
    /// <summary>Деструкор кучи</summary>
    ~BinaryHeap(){};

    /// <summary>Размер кучи</summary>
    /// <returns>Возвращает размер кучи в Int32</returns>
    unsigned int Size()
    {
        return heap.size();
    }

    /// <summary>Операция добавления элемента в кучу</summary>
    /// <remarks>
    /// Временная сложность операции: O(log2 N).
    /// Новый элемент добавляется на последнее место в куче/массиве, то есть позицию с максимальным индексом.
    /// Возможно, что при этом будет нарушено основное свойство кучи, т.к. новый элемент может быть больше родителя.
    /// В таком случае новый элемент "поднимается" на один уровень (меняется с вершиной-родителем) до тех пор, пока не будет соблюдено основное свойство кучи.
    /// </remarks>
    /// <param name="element">Элемент с типом Int32 который будет вставлен в кучу</summary>
    void Insert(int element)
    {
        heap.push_back(element);
        heapifyUp(heap.size() - 1);
    }

    /// <summary>Операция удаления минимального элемента из кучи</summary>
    /// <remarks>
    /// В упорядоченной куче "сверху-вниз" максимальный элемент всегда хранится в корне.
    /// Алгоритм восстанавлиает упорядоченность двоичной кучи после удаления максимального элемента, устанавливая на его место последний элемент и производя операцию упорядочения кучи "сверху-вниз".
    /// </remarks>
    /// <returns>Возвращает true - операция выполнена, false - куча не имеет узлов (пустая)</returns>
    bool DeleteMin()
    {
        if (heap.size() == 0)
        {
            // wcout << "Куча пуста" << endl;
            return false;
        }
        heap[0] = heap.at(heap.size() - 1);
        heap.pop_back();
        heapifyDown(0);
        // wcout << "Элемент удалён" << endl;
        return true;
    }

    /// <summary>Операция получения минимального элемента из кучи</summary>
    /// <remarks>Временная сложность операции: O(1)</remarks>
    /// <returns>Возвращает минимальный размер кучи в Int32</returns>
    int GetMin()
    {
        return heap.size() == 0 ? -1 : heap.front();
    }

    /// <summary>Операция получения вектора (массива) кучи</summary>
    /// <returns>Возвращает ссылку на вектор (массив) кучи</returns>
    vector<int>* GetHeap() {
        return &this->heap;
    }

    /// <summary>Операция вывода кучи в stdout</summary>
    void DisplayHeap()
    {
        this->DisplayVector(heap);
    }

    /// <summary>Операция вывода вектора в stdout</summary>
    /// <param name="v">Вектор который необходимо вывести в stdout</summary>
    template <typename T>
    static void DisplayVector(vector<T> &v)
    {
        typename vector<T>::iterator itr = v.begin();
        // wcout << "Куча -->  ";
        while (itr != v.end())
        {
            wcout << *itr << " ";
            itr++;
        }
        wcout << endl;
    }
};