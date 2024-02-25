import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}
// search квери параметры:
// Анализируем работу снизу как все прилетает - с точки зрения юзера - предварительно
// на UX на сайте посмотреть как работает логику понять

// декларация определение запроса на сервер:
const getTechsRequest = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

// Пагинация
const HW15 = () => {
    // сортировка
    const [sort, setSort] = useState('')
    // текущая страница (каждая страница возвращает по 4 записи - размер страницы - count)
    const [page, setPage] = useState(1)

    // размер страницы (записей tech - кол-во элементов что храним на каждой стр.)
    // у нас 4 tech === 4 - делаем размер страницы из 4 навыков
    const [count, setCount] = useState(4)

    // стейт для загрузки
    const [idLoading, setLoading] = useState(false)

    // всего всех techs === 100 по умолчанию ставим - потом обновим когда с сервера придет
    // количество что там хранится на сервере - им обновим наш стеит например 78 получим а не 100
    const [totalCount, setTotalCount] = useState(100)

    // searchParams -все параметры после ? после названия эндпоинта или http адреса
    // setSearchParams - обновляет адресную строку - установим в стейт (локальный или глобальный)
    // параметры что ввел юзер (его поисковый запрос), и новое обновленное значение в стейте
    // будет иметь например вид как:
    // 'https://samurai.it-incubator.io/api/3.0/homework/test3'?page=2&count=12&sort=tech
    const [searchParams, setSearchParams] = useSearchParams()

    const [techs, setTechs] = useState<TechType[]>([]) // techs - навыки

    // делаем запрос на сервак - всегда get запрос с квери параметрами которые выбрал юзер на UI
    const sendQuery = (params: any) => {
        setLoading(true)
        getTechsRequest(params)
            .then((res) => {
                // когда получили - сохранить пришедшие данные в стейт
                if (res) {
                    // смотрим апишку что приходит или консоль или дебаг
                    setTechs(res.data.techs)
                    // установили всего сколько пришло
                    setTotalCount(res.data.totalCount)
                }
                setLoading(false)
            })
    }

// при изменении страницы по клику на span снова отправляем запрос
    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)
        // устанавливаем параметры в урл что выбрал пользователь - урл обновится
        // чтобы достать оттуда значения searchParams.get() - Непомнящий
        // тк sort не прокинули сюда - в стейте стоит по умолчанию пустая строка
        setSearchParams([['page', newPage.toString()],['count', newCount.toString()],['sort', sort]])
    }

    // изменение сортировки
    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort)
        setPage(1)
        // sendQuery({ sort, page, count})
        setSearchParams([['page', '1'],['count', count.toString()],['sort', newSort]])
    }

    // получаем все элементы при первой загрузке страницы - делаем запрос к АПИ
    // при изменении, обновлении searchParams повторно поидет запрос за актуальными данными
    useEffect(() => {
        const params = Object.fromEntries(searchParams) // объект: ключ-значение
        // sendQuery({page: params.page, count: params.count})
        sendQuery(params)

        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [searchParams])

    // мапимся переменная вынесли
    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}

                <SuperPagination
                    currentPage={page}
                    newCount={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
