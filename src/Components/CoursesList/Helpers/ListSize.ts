// BREAKPOINTS
import {
	breakPoint,
	breakPointLarge,
	breakPointLarge2,
	breakPointMid,
	breakPointMid2,
} from 'Grids/Breakpoints'

// DIMENSIONES
export const listHeight: number = window.innerHeight
export const listWidth: number = breakPointLarge2
	? 550
	: breakPoint
	? 450
	: breakPointMid
	? window.innerWidth - 70
	: window.innerWidth
export const itemHeight: number = breakPointMid2 ? (breakPointLarge ? 350 : 320) : 270
