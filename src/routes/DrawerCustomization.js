import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share} from "react-native";
import {Button, Container, Content, Icon} from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';
import ProgressCircle from 'react-native-progress-circle'
import {logout, tempAuth, chooseLang} from "../actions";
import styles from "../../assets/styles";
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";

class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }

	userLogout(){
		this.props.navigation.closeDrawer();
		this.props.navigation.navigate('login');
		this.props.logout(this.props.user.token);
		this.props.tempAuth();
	}

    render() {
		const user = {
			avatar      : 'https://i.pinimg.com/564x/7f/57/7a/7f577a9bb7ee2556179e5f4e3ea1ff3a.jpg',
			name        : 'اوامر الشبكة',
		};

        return (
			<Container>
				<Content contentContainerStyle={styles.bgFullWidth}>

					<View style={{ backgroundColor: '#27336d', height: 200, alignItems: 'center', justifyContent: 'center' }}>

						<View style={[styles.viewUser, styles.justifyCenter]}>
							<TouchableOpacity style={[styles.position_R, styles.flexCenter, styles.zIndexUp, styles.Width_100, styles.marginHorizontal_25 ]}>
                                <ProgressCircle
                                    percent={30}
                                    radius={50}
                                    borderWidth={4}
                                    color="#f3ae44"
                                    shadowColor="#fff"
                                    bgColor="#27336d"
                                >
                                    <Image style={[styles.width_80, styles.height_80, { borderRadius: 50 }]} source={{ uri: user.avatar }}/>
                                </ProgressCircle>
								<View style={{ marginTop: 5 }} onPress={() => this.props.navigation.navigate('profile')}>
									<Text style={[styles.textRegular, styles.text_White, { fontSize: 18, alignSelf: 'center' }]}>{ user.name }</Text>
								</View>
							</TouchableOpacity>
						</View>

					</View>

					<View style={[styles.marginVertical_25]}>
						<DrawerItems {...this.props}
							activeTintColor={'#f00'}
							onItemPress={
								(route) => {
									if (route.route.key === 'logout') {
										this.userLogout()
									}else {
										this.props.navigation.navigate(route.route.key);
									}
								}
							}

							items                          = {this.props.auth !== null ? this.props.items : this.props.items.filter((item) =>  this.filterItems(item) ) }
							inactiveBackgroundColor        = 'transparent'
							activeLabelStyle               = {COLORS.red}
							labelStyle                     = {styles.drawerLabel}
							iconContainerStyle             = {styles.drawerIcon}
							itemStyle                      = {{ paddingVertical: 8, marginVertical: 5 }}
							itemsContainerStyle            = {styles.marginVertical_10}
						/>

					</View>

				</Content>

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

export default connect(mapStateToProps, { logout, tempAuth, chooseLang })(DrawerCustomization);
