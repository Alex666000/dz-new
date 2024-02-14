import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'
import {OptionType} from "../../HW7";
// залазим внутрь DetailedHTMLProps и смотрим дефолтные пропсы - их уточняем атрибутами select
type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>


type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: OptionType[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
// className - явл-тся дефолтным пропсом
// но т.к он нам нужен в этом файле его тоже деструктуризируем - иначе он попал бы в {...restProps}
    className,
    // onChange - явл-тся дефолтным пропсом но т.к он нам нужен в этом файле его тоже деструктуризируем
// - иначе он попал бы в {...restProps}
    onChange,
    onChangeOption,
    ...restProps
}) => {

    const mappedOptions: any[] = options
        ? options.map((option) => (
              <option
                  id={'hw7-option-' + option.id}
                  className={s.option}
                  key={option.id}
                  value={option.id}
              >
                  {option.value}
              </option>
          ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        onChange && onChange(e)
        onChangeOption?.(e.currentTarget.value)
    }

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect




















/*// select
export const ControlSelect = () => {
    const [parentValue, setParentValue] = useState<string | undefined>('2')
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setParentValue(e.currentTarget.value)
    }
    return <select value={parentValue} onChange={onChange}>
        <option>None</option>
        <option value={1}>Minsk</option>
        <option value={2}>Moscow</option>
        <option value={3}>Kiev</option>
    </select>
}*/
// -------------------------------------------------------------------------------------------------
                                      // select
// import React, {useState} from "react";
// import s from "./Select.module.css"
//
// type ItemType = {
//     title: string
//     value?: any
// }
//
// type SelectPropsType = {
//     value: any
//     onChange: (value: any) => void
//     items: ItemType[]
// }
//
// export function Select(props: SelectPropsType) {
//     const [active, setActive] = useState(false)
//     const [hovered, setHovered] = useState(props.value)
//     const selectedItem = props.items.find(i => i.value === props.value)
//     const hoveredItem = props.items.find(i => i.value === hovered)
//     const toggleItems = () => {
//         setActive(!active)
//     }
//     const onItemClick = (value: any) => {
//         props.onChange(value);
//         toggleItems()
//     }
//
//     return (
//         <>
//             <select>
//                 <option value={""}>Minsk</option>
//                 <option value={""}>Moscow</option>
//                 <option value={""}>Kiev</option>
//             </select>
//             {/* класс select всегда, а класс active если активен элемент*/}
//             <div className={s.select}>
//                 <div>
//                     <span className={s.main} onClick={toggleItems}>
//                         {selectedItem && selectedItem.title} </span>
//                     {/*элементы*/}
//                     {active &&
//                         <div className={s.items}>
//                             {props.items.map(i =>
//                                 <div className={s.item + "" + (hovered === i ? s.selected : "")}
//                                      key={i.value}
//                                      onClick={onItemClick}
//                                 >{i.title}
//                                 </div>)}
//                         </div>
//                     }
//
//
//                 </div>
//             </div>
//         </>
//     );
// }
