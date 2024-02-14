import React from 'react'
import {Slider, SliderProps, styled} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <StyledSlider
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange

const StyledSlider = styled(Slider)({
    color: '#0C2',
    height: 4,
    width: 147,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#FFF',
        border: '1.5px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            height: 6,
            width: 6,
            backgroundColor: '#0C2'
        },
    },
    '& .MuiSlider-rail': {
        color: '#8B8B8B',
    }
});