import React, { Component } from "react";import { View, Text, Image, TouchableOpacity, Platform, Dimensions, I18nManager, KeyboardAvoidingView } from "react-native";import { Container, Content, Header, Button, Left, Body, Right, Item, Input, Form, Label, Textarea} from 'native-base'import styles from '../../assets/styles';import {NavigationEvents} from "react-navigation";import Spinner from "react-native-loading-spinner-overlay";import {connect} from "react-redux";import ProgressCircle from "react-native-progress-circle";import COLORS from "../consts/colors";class Profile extends Component {	constructor(props){		super(props);		this.state={			spinner     : false,		}	}	static navigationOptions = () => ({		header      : null,		drawerLabel : ({ focused }) => ( <Text style={[styles.textRegular, styles.textSize_18, { color: focused ? '#f6b549' : '#27336d' }]}>عن التطبيق</Text> ) ,		drawerIcon  : ({ focused }) => ( <Image style={[styles.smImage]} source={focused ? require('../../assets/images/yellow_info.png') : require('../../assets/images/blue_info.png')} resizeMode={'cover'}/>)	});	onFocus(){	}	render() {		return (			<Container>				<Spinner visible = { this.state.spinner } />				<NavigationEvents onWillFocus={() => this.onFocus()} />				<Header style={styles.headerView}>					<Right style={{ flex: 0 }}>						<Button transparent onPress={() => this.props.navigation.goBack()}>							<Image source={require('../../assets/images/back.png')} resizeMode={'contain'} style={{ width: 25, height: 25 }}/>						</Button>					</Right>					<Body style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>					<Text style={[styles.textBold, styles.text_White, { fontSize: 18, alignSelf: 'center' }]}>حسابي</Text>					</Body>					<Left style={{ flex: 0 }}>						<Image source={require('../../assets/images/vector.png')} resizeMode={'contain'} style={{ width: 100, height: 100, top: 5, right: -5 }}/>					</Left>				</Header>				<Content contentContainerStyle={styles.bgFullWidth}>					<View style={{ padding: 15 }}>						<View style={{ alignItems: 'center', justifyContent: 'center' }}>							<TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')} style={{ width: 30, height: 30, right: 55, top: 10 }}>								<Image style={{ width: 25, height: 25, }} source={require('../../assets/images/edit.png')}/>							</TouchableOpacity>							<View style={[styles.viewUser, styles.justifyCenter]}>								<View style={[styles.position_R, styles.flexCenter, styles.zIndexUp, styles.Width_100, styles.marginHorizontal_25 ]}>									<ProgressCircle										percent={30}										radius={50}										borderWidth={4}										color="#f3ae44"										shadowColor="#fff"										bgColor="#27336d"									>										<Image style={[styles.width_80, styles.height_80, { borderRadius: 50 }]} source={{ uri: this.props.user.avatar }}/>									</ProgressCircle>									<View style={{ marginTop: 5 }} onPress={() => this.props.navigation.navigate('profile')}>										<Text style={[styles.textRegular, { color: '#27336d', fontSize: 18, alignSelf: 'center' }]}>{ this.props.user.name }</Text>									</View>								</View>							</View>							<View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5, { marginTop: 30 } ]}>								<Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>									<Label style={[styles.label, styles.textRegular ,{ color:this.state.phoneStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>رقم الجوال</Label>									<Input value={ this.props.user.phone } style={[styles.input, styles.height_50, (this.state.phoneStatus === 1 ? styles.Active : styles.noActive)]}										onChangeText={(phone) => this.setState({phone})}										onBlur={() => this.unActiveInput('phone')}										onFocus={() => this.activeInput('phone')}										keyboardType={'number-pad'}									/>								</Item>							</View>						</View>					</View>				</Content>			</Container>		);	}}const mapStateToProps = ({ auth, profile }) => {	return {		auth    : auth.user,		user    : profile.user	};};export default connect(mapStateToProps, {  })(Profile);