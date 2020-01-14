#pragma once

#include <vector>

using namespace std;

namespace Quicksort
{
    /// <summary>Разбивает вектор (массив) на две группы</summary>
    /// <remarks>1) значения меньше или равные опорному элементу 2) значения больше опорного элемента</remarks>
    /// <returns>Возвращает индекс опорной точки</returns>
    template <typename T>
    unsigned int pivot(vector<T>& v, unsigned int start, unsigned int stop, unsigned int position)
    {
        // перемещаем опорную точку в заданную начальную позицию
        swap(v[start], v[position]);

        // значения группы
        unsigned int low = start + 1;
        unsigned int high = stop;
        while (low < high)
        {
            if (v[low] < v[start])
            {
                low++;
            }
            else if (v[--high] < v[start])
            {
                swap(v[low], v[high]);
            }
        }
        // возвращаем опорную точку на обратную позицию
        swap(v[start], v[--low]);
        return low;
    }

    /// <summary>Сортирует вектор (массив) в заданном диапазоне</summary>
    /// <param name="v">Вектор в котором необходимо произвести сортировку</summary>
    /// <param name="low">Начальный индекс для диапазонной сортировки</summary>
    /// <param name="high">Конечный индекс для диапазонной сортировки</summary>
    template <typename T>
    void Quicksort(vector<T>& v, unsigned int low, unsigned int high)
    {
        // если в векторе (массиве) 1 или менее элементов, то не производим сортировку
        if (low >= high)
            return;

        // выбираем опорную точку
        unsigned int pivotIndex = (low + high) / 2;

        // разделяем вектор (массив) на две группы
        pivotIndex = pivot(v, low, high, pivotIndex);

        // производим сортировку групп
        if (low < pivotIndex)
            Quicksort(v, low, pivotIndex);
        if (pivotIndex < high)
            Quicksort(v, pivotIndex + 1, high);
    }

    /// <summary>Сортирует вектор (массив)</summary>
    /// <param name="v">Вектор в котором необходимо произвести сортировку</summary>
    template <typename T>
    void Quicksort(vector<T>& v)
    {
        unsigned int numberElements = v.size();
        // если в векторе (массиве) более 1 элемента, запускаем сортировку
        if (numberElements > 1)
            Quicksort(v, 0, numberElements);
    }

}; // namespace QuickSort