import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'

import { colors } from '../theme'

import CenterMessage from '../components/CenterMessage'

export default class City extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: props.navigation.state.params.city.city,
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: '400'
            }
        }
    }
    state = {
        name: '',
        info: ''
    }
    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    addLocation = () => {
        if(this.state.name === '' || this.state.info === '') return
        const { city } = this.props.navigation.state.params
        const location = {
            name: this.state.name,
            info: this.state.info
        }
        this.props.screenProps.addLocation(location, city)
        this.setState({
            name: '',
            info: ''
        })
    }
    render() {
        const { city } = this.props.navigation.state.params
        return (
            <View style={{ flex: 1 }}>
                {
                    !city.locations.length && <CenterMessage message='No locations' />
                }
                {
                    city.locations.map((location, index) => (
                        <View style={styles.locationContainer}>
                            <Text style={styles.name}>{location.name}</Text>
                            <Text style={styles.info}>{location.info}</Text>
                        </View>
                    ))
                }
                <TextInput
                    value={this.state.name}
                    placeholder='Location name'
                    onChangeText={val => this.onChangeText('name', val)}
                    style={styles.input}
                    placeholderTextColor='white'
                 ></TextInput>
                <TextInput
                    value={this.state.info}
                    placeholder='Location info'
                    onChangeText={val => this.onChangeText('info', val)}
                    style={[styles.input, styles.input2]}
                    placeholderTextColor='white'
                 ></TextInput>
                 <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.addLocation}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText} >Add Location</Text>
                        </View>
                    </TouchableOpacity>
                 </View>
                 <TextInput />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    locationContainer: {
        padding: 10,
        borderBottomColor: colors.primary,
        borderBottomWidth: 2
    },
    name: {
        fontSize: 20
    },
    info: {
        color: 'rgba(0,0,0,.5)'
    },
    input:{
        position: 'absolute',
        height: 50,
        backgroundColor: colors.primary,
        width: '100%',
        bottom: 104,
        left: 0,
        color: 'white'
    },
    input2: {
        bottom: 52
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'        
    },
    button: {
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
})