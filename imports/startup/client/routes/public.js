import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import Layout from '../../../../client/imports/ui/layouts/base'

import Index from '../../../../client/imports/ui/pages/index'

/* Index Route */
FlowRouter.route('/', {
  name: 'index',
  action (params) {
    mount(Layout, {
      content () {
        return <Index />
      }
    })
  }
})
