'use strict';
import React, { Component } from 'react';
import {
    CameraRoll,
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button,
    ToastAndroid,
    TouchableOpacity,
    Image
} from 'react-native';
import Camera from 'react-native-camera';


export default class ComCam extends Component {

    constructor(p) {
        super(p);
        this.state = {
            showLoading: false
        }
        this.onNext = this.onNext.bind(this);
    }

    setLoading(showLoading) {
        this.setState({showLoading})
    }

    onNext(data) {
        this.props.setActiveView(2, data)

    }

    render() {
        const {showLoading} = this.state;
        return (
            <View style={styles.wrapper}>
                <Camera
                    ref={(cam) => {
            this.camera = cam;
          }}
                    orientation={Camera.constants.Orientation.auto }
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Button
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}
                        title={showLoading? 'Saving...':'Detect'}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                        disabled={showLoading}
                        />
                </Camera>
            </View>


        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.setLoading(true)
        this.camera.capture({metadata: options})
            .then((data) => {
                this.setLoading(false)
                CameraRoll.getPhotos({first: 1})
                    .then((res) => {
                        console.log('111 data', data)
                        console.log('111 res', res)
                        ToastAndroid.show('files from camera rolll ' + JSON.stringify(res), 0)
                    })
                .catch((e) => {
                        ToastAndroid.show('Error while getting photos ' + e.message, 0)
                    })

                //this.onNext(data)
            })
            .catch(err => {
                this.setLoading(false)
                ToastAndroid.show('Error while saving image ' + err.message, ToastAndroid.SHORT)
                console.error(err)
            });
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});