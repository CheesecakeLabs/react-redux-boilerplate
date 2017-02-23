import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDevTools } from 'redux-devtools'
// eslint-disable-next-line import/no-extraneous-dependencies
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(<LogMonitor />)
