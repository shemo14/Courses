import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, I18nManager, Linking} from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast, Header, Button, Icon, Body} from 'native-base'
import styles from '../../assets/styles';
import i18n from '../../locale/i18n'
import {NavigationEvents} from "react-navigation";
import { userLogin, profile } from '../actions'
import {connect} from 'react-redux';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'
import COLORS from "../consts/colors";
import Spinner from "react-native-loading-spinner-overlay";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone               : '',
            password            : '',
            deviceId            : '',
            device_type         : 'ios',
            userId              : null,
            type                : 0,
            phoneStatus         : 0,
            passwordStatus      : 0,
			spinner             : false,
            wathsNumber         : ''
        }
    }

    activeInput(type) {

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

        if (type === 'password' || this.state.password !== '') {
            this.setState({passwordStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

        if (type === 'password' && this.state.password === '') {
            this.setState({passwordStatus: 0})
        }

    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('pass');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'sukar',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    renderSubmit() {
        if (this.state.password == '' || this.state.phone == '') {
            return (
                <TouchableOpacity style={[ styles.Width_100, styles.flexCenter, styles.flexCenter, styles.marginVertical_15, styles.height_50 , {
                        backgroundColor:'#999', borderRadius: 10
                    }]}
                >
                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>دخول</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={[ styles.Width_90, styles.flexCenter, styles.flexCenter, styles.marginVertical_15, styles.height_50, { borderRadius: 10, backgroundColor: '#f6b145' }]}
                onPress={() => this.onLoginPressed()}>
				<Text style={[styles.textRegular, styles.textSize_16, styles.text_White]}>دخول</Text>
            </TouchableOpacity>
        );
    }

    onLoginPressed() {
        const err = this.validate();

        if (!err){
            this.setState({ spinner: true });
            const {phone, password, deviceId , device_type} = this.state;
            this.props.userLogin({ phone, password, deviceId , device_type});
        }

    }

    async componentWillMount() {
        I18nManager.forceRTL(true);

        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        AsyncStorage.getItem('whats').then(wathsNumber => this.setState({ wathsNumber }));

        this.setState({deviceId, userId: null});
        AsyncStorage.setItem('deviceID', deviceId);

    }

    componentWillReceiveProps(newProps) {

        console.log('props auth ...', newProps.auth);


        if (newProps.auth !== null && newProps.auth.success) {

            if (this.state.userId === null) {
                this.setState({userId: newProps.auth.data.id});
                this.props.profile(newProps.auth.data.token);
            }

			this.props.navigation.navigate('drawerNavigator');
        }

        if (newProps.auth !== null) {
			this.setState({ spinner: false });

            Toast.show({
                text: newProps.auth.message,
                type: newProps.auth.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "#fff",
                    fontFamily: 'sukar',
                    textAlign: 'center',
                }
            });
        }

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>
				<Spinner visible = { this.state.spinner } />
                <NavigationEvents onWillFocus={() => this.onFocus()} />

				<Header style={styles.headerView}>
					<Body style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
					    <TouchableOpacity onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=' + this.state.wathsNumber )} style={styles.whatsappContainer}>
                            <Image source={require('../../assets/images/whatsapp_phone.png')} resizeMode={'contain'} style={{ width: 40, height: 40 }}/>
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={[styles.textBold, { color: '#66bd86', fontSize: 16 }]}>التواصل عبر الواتس</Text>
                                <Text style={[styles.textBold, styles.text_White, { fontSize: 16, alignSelf: 'flex-start', marginTop: 5 }]}>{ this.state.wathsNumber }</Text>
                            </View>
                        </TouchableOpacity>
					</Body>
				</Header>

                <Content contentContainerStyle={styles.bgFullWidth}>
                    <View style={{ marginTop: 20, marginHorizontal: 15, marginBottom: 50 }}>
						<Text style={[styles.textBold, styles.textSize_24, styles.textRight, styles.marginVertical_15, styles.marginHorizontal_20, { color: '#000' }]}>دخول</Text>
						<Text style={[styles.textRegular, styles.textRight, styles.marginHorizontal_20, { color: '#bbc0c3' }]}>الرجاء تسجيل الدخول حتي تتمكن من تصفح التطبيق</Text>
                    </View>

                    <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.marginVertical_25, styles.Width_100, styles.centerColum]}>
                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:this.state.phoneStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>رقم الجوال</Label>
                                        <Input style={[styles.input, styles.height_50, (this.state.phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(phone) => this.setState({phone})}
                                            onBlur={() => this.unActiveInput('phone')}
                                            onFocus={() => this.activeInput('phone')}
                                            keyboardType={'number-pad'}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R,  styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label ,{ color:this.state.passwordStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>كلمة المرور</Label>
                                        <Input
                                            style={[styles.input, styles.height_50, (this.state.passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(password) => this.setState({password})}
                                            onBlur={() => this.unActiveInput('password')}
                                            onFocus={() => this.activeInput('password')}
                                            secureTextEntry
                                        />
                                    </Item>
                                </View>

                                {this.renderSubmit()}

                            </Form>
                        </KeyboardAvoidingView>
                    </View>
                </Content>

            </Container>

        );
    }
}
const mapStateToProps = ({ auth, profile }) => {
    return {
		loading: auth.loading,
		auth:    auth.user,
		user:    profile.user,
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);
