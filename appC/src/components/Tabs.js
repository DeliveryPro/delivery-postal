import React, { createContext } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import { SCREEN_WIDTH } from '../constants/screen'
import { ACTIVE_COLOR, DEFAULT_COLOR, UNDERLAY_COLOR } from '../constants/colors'
import { MAIN, MAP, QR_CODE_SCANNER } from '../constants/pages'

import QR from '../assets/qr.svg'
import List from '../assets/list.svg'
import Map from '../assets/map.svg'

const TabContext = createContext()

const useStyles = StyleSheet.create((theme) => ({
    root: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:"#fff"
    },
    itemWrapper: {
        borderColor: '#eee',
        alignItems: 'center',
        width: SCREEN_WIDTH / 3,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 20,
    },
}))

const ICON_SIDE = 30

const Tabs = ({ activeScreen = MAIN, ...props }) => {
    const classes = useStyles()

    const getColor = (name) => (name === activeScreen ? ACTIVE_COLOR : DEFAULT_COLOR)

    return (
        <View style={classes.root}>
            <TabContext.Provider value={props}>
                <TabItem name={MAIN} icon={<List stroke={getColor(MAIN)} width={ICON_SIDE} height={ICON_SIDE} />} />
                <TabItem
                    name={QR_CODE_SCANNER}
                    icon={<QR stroke={getColor(QR_CODE_SCANNER)} width={ICON_SIDE} height={ICON_SIDE} />}
                />
                <TabItem name={MAP} icon={<Map stroke={getColor(MAP)} width={ICON_SIDE} height={ICON_SIDE} />} />
            </TabContext.Provider>
        </View>
    )
}

const TabItem = ({ name, icon }) => {
    const classes = useStyles()
    const toTab = (to) => () => to(name)

    return (
        <TabContext.Consumer>
            {({ navigation }) => (
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={toTab(navigation.navigate)}>
                    <View style={classes.itemWrapper}>{icon}</View>
                </TouchableHighlight>
            )}
        </TabContext.Consumer>
    )
}

export default Tabs
