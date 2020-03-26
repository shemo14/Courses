import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, } from "react-native";
import { Container, Content, Header, Button, Left, Body, Right, Card} from 'native-base'
import axios from 'axios';
import styles from '../../assets/styles';
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import CONST from "../consts";



class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            spinner  	: true,
            categories  : [],
        }
    }

    componentWillMount() {
    	this.setState({ spinner  : true });

		axios({
			url         : CONST.url + 'categories',
			method      : 'GET',
		}).then(response => {
			this.setState({ spinner  : false, categories: response.data.data })
		});
    }

    componentWillReceiveProps(nextProps) {
    	console.log('user login', nextProps);

	}

	static navigationOptions = () => ({
        header      : null,
        drawerLabel : ({ focused }) => ( <Text style={[styles.textRegular, styles.textSize_18, { color: focused ? '#f6b549' : '#27336d' }]}>الرئيسية</Text> ) ,
        drawerIcon  : ({ focused }) => ( <Image style={[styles.smImage]} source={focused ? require('../../assets/images/yellow_home.png') : require('../../assets/images/blue_home.png')} resizeMode={'cover'}/>)
    });

	_keyExtractor = (item, index) => item.id;

	renderItems = (item) => {
		item.index >= 2 && item.index%2 === 0 ? console.log('this is id', item.item.name) : false;
		return(
			<TouchableOpacity
				onPress     = {() => this.props.navigation.navigate('category', { name : item.item.name, id: item.item.id  })}
				key         = { item.index }
				style       = {[styles.position_R, item.index%2 === 0 ? styles.height_150 : styles.height_250, { alignSelf: 'flex-start', top: item.index >= 2 && item.index%2 === 0 ? (item.index/2) * -105 : 0 , marginBottom: 35, width: '46.7%', marginHorizontal: 6, zIndex: item.index * 5 }]}>
				<Card style={[ item.index%2 === 0 ? styles.height_150 : styles.height_250, { borderRadius: 10, padding: 0 }]}>
					<Image source={{ uri: item.item.image  }} resizeMode={'cover'} style={{ width: '100%', height: '100%', borderRadius: 10,}}/>
				</Card>
				<Text style={[styles.textRegular, { fontSize: 16, alignSelf: 'center', color: '#3c3c3c' }]}>{ item.item.name }</Text>
			</TouchableOpacity>
		);
	};

	onFocus(){
        this.componentWillMount();
    }

    render() {
		let { categories } 	= this.state;
		const firstCategory = categories.length > 0 ? { id: categories[0].id, name: categories[0].name, image: categories[0].image } : null;
		if (categories.length > 0 )
			categories.splice(0 , 1);
		else categories = [];


        return (
			<Container>
				<Spinner visible = { this.state.spinner } />
				<NavigationEvents onWillFocus={() => this.onFocus()} />

				<Header style={styles.headerView}>
					<Right style={{ flex: 0 }}>
						<Button transparent onPress={() => this.props.navigation.openDrawer()}>
							<Image source={require('../../assets/images/menu.png')} resizeMode={'contain'} style={{ width: 25, height: 25 }}/>
						</Button>
					</Right>
					<Body style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
					    <Text style={[styles.textBold, styles.text_White, { fontSize: 18, alignSelf: 'center' }]}>الرئيسية</Text>
					</Body>
                    <Left style={{ flex: 0 }}>
						<Image source={require('../../assets/images/vector.png')} resizeMode={'contain'} style={{ width: 100, height: 100, top: 5, right: -5 }}/>
                    </Left>
				</Header>

				<Content contentContainerStyle={styles.bgFullWidth}>
                    <View style={{ padding: 15 }}>
						{
							firstCategory != null ?
								<TouchableOpacity onPress={() => this.props.navigation.navigate('category', { name: firstCategory.name, id: firstCategory.id })}>
									<Card style={{ borderRadius: 10, height: 150, padding: 0 }}>
										<Image source={{ uri: firstCategory.image }} resizeMode={'cover'} style={{ width: '100%', height: 150, borderRadius: 10,}}/>
									</Card>
									<Text style={[styles.textRegular, { fontSize: 16, marginTop: 5, alignSelf: 'center', color: '#3c3c3c' }]}>{ firstCategory.name }</Text>
								</TouchableOpacity> : null
						}

						<FlatList
							data                    = {categories}
							renderItem              = {(item) => this.renderItems(item)}
							numColumns              = {2}
							keyExtractor            = {this._keyExtractor}
						/>
                    </View>

				</Content>
                <Card style={{ position: 'absolute', width: '80%', bottom: 20, height: 50, borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', padding: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('drawerNavigator')}>
                        <Image source={require('../../assets/images/yellow_home.png')} resizeMode={'contain'} style={{ width: 30, height: 30 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('statistics')}>
                        <Image source={require('../../assets/images/up.png')} resizeMode={'contain'} style={{ width: 30, height: 30 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
                        <Image source={require('../../assets/images/bell.png')} resizeMode={'contain'} style={{ width: 30, height: 30 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={{ borderRadius: 50, borderWidth: 2, borderColor: '#27336d', overflow: 'hidden' }}>
                        <Image source={{ uri: this.props.user ? this.props.user.avatar : '' }} resizeMode={'contain'} style={{ width: 35, height: 35, borderRadius: 50}}/>
                    </TouchableOpacity>
                </Card>

			</Container>

        );
    }
}


const mapStateToProps = ({ auth, profile }) => {
	return {
		auth    : auth.user,
		user    : profile.user
	};
};

export default connect(mapStateToProps, {  })(Home);
