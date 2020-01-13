#pragma once
#include <iostream>
#include <io.h>
#include <fcntl.h>

using namespace std;

#include "BinaryHeap.class/BinaryHeap.cpp"

int wmain(int argc, wchar_t* argv[])
{
    // setlocale(LC_ALL, "Russian");

    _setmode(_fileno(stdout), _O_U16TEXT);
    _setmode(_fileno(stdin), _O_U16TEXT);
    _setmode(_fileno(stderr), _O_U16TEXT);

    BinaryHeap binaryHeap;
    while (1)
    {
        wcout << "\n------------------" << endl;
        wcout << L"Операции с кучей" << endl;
        wcout << "------------------" << endl;
        wcout << L"1) Добавить элемент" << endl;
        wcout << L"2) Удалить минимальный элемент" << endl;
        wcout << L"3) Получить минимальный элемент" << endl;
        wcout << L"4) Вывести кучу" << endl;
        wcout << L"5) Выход" << endl;
        int choice, element;
        wcout << L"Выберите операцию:\n" << endl;

        wcin >> choice;
        switch (choice)
        {
        case 1:
            wcout << L"Введите число, которое должно быть помещено в кучу: ";
            wcin >> element;
            binaryHeap.Insert(element);
            break;
        case 2:
            wcout << L"Удаление минимального элемента: ";
            if (binaryHeap.GetMin() == -1)
            {
                wcout << L"Куча пуста" << endl;
            }
            else
            {
                int el = binaryHeap.GetMin();
                binaryHeap.DeleteMin();
                wcout << L"Элемент удалён: " << el << endl;
            }
            break;
        case 3:
            wcout << L"Минимальный элемент: ";
            if (binaryHeap.GetMin() == -1)
            {
                wcout << L"Куча пуста" << endl;
            }
            else
                wcout << L"Минимальный элемент:  " << binaryHeap.GetMin() << endl;
            break;
        case 4:
            wcout << L"Элементы кучи:  ";
            binaryHeap.DisplayHeap();
            break;
        case 5:
            exit(1);
        default:
            wcout << L"\nВыберите пункт из меню, указав его номер" << endl;
        }
    }
    return 0;
}