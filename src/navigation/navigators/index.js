import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { connect } from 'react-redux';

import Home from '../../features/home/containers/home';
import Login from '../../features/authentication/containers/login';
import Verification from '../../features/authentication/containers/code';
import Invoices from '../../features/invoices/containers/invoices';
import CreateSupplier from '../../features/invoices/containers/create';

import Items from '../../features/invoice_items/containers/invoice_item';

// Name un known
import CreateBook from '../../features/ctCreate/components';
import List from '../../features/ctCreate/components/list';

const AppNavigator = createStackNavigator({
    login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
    home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
    code:{
      screen: Verification,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
    invoices: {
      screen: Invoices,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
    ctSupplier: {
      screen: CreateSupplier,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
    invoiceItem: {
        screen: Items,
        navigationOptions: ({ navigation }) => ({
                header: null,
                tabBarVisible: false,
                headerStyle: {
                    backgroundColor: '#000',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTintColor: '#fff'
            })
    },
    cvSupplier: {
      screen: Verification,
      navigationOptions: ({ navigation }) => ({
              header: null,
              tabBarVisible: false,
              headerStyle: {
                  backgroundColor: '#000',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
              },
              headerTintColor: '#fff'
          })
    },
});


export var Main = createAppContainer(AppNavigator);
