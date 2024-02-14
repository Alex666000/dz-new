import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'
import {OptionType} from "../../HW7";

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: any[]
    onChangeOption?: (option: any) => void

    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
    id,
    name,
    className,
    options,
    value,
    onChange,
    onChangeOption,
    spanProps,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // делают студенты
        // если onChange котрый работате с объектом события передаем ему e, onChangeOption
        onChange && onChange(e)
        onChangeOption?.(e.currentTarget.value)
    }

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    const mappedOptions: any[]   = options
        ? options.map((option) => (
              <label key={name + '-' + option.id} className={s.label}>
                  <input
                      id={id + '-input-' + option.id}
                      className={finalRadioClassName}
                      type={'radio'}
                      // name, checked, value делают студенты
                      name={name}
                      // синхронизировали value селекста и радиокнопки
                      checked={option.value === value}
                      value={option.value}
                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  <span
                      id={id + '-span-' + option.id}
                      {...spanProps}
                      className={spanClassName}
                  >
                      {option.value}
                  </span>
              </label>
          ))
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio




/*
1: // map options with key --- Радиокнопки слетят на сайте залитом... // - двойной коммент - сломает на githubPages проект - тк jsx комментируется как палочка звездочка, а js код как // - значит эта запись находится между jsx и js поэтому слетит сайт
2: // onChange - работает с event_ом; onChangeOption - показывает какой option  был выбран в радио-группе  --- работате с value
3: : [] если options никто не передал, то мы заменяем мапленные опшены пустым массивом и тогда ничего не сломается
 */
