import { defineAction as reduxDefine } from 'redux-define'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED']

export const defineAction = (type, subactions) => reduxDefine(type, subactions || REQUEST)
