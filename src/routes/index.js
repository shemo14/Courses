import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';

import { I18nManager } from "react-native";

import DrawerCustomization      from "./DrawerCustomization";
import InitScreen      from "../components/InitScreen";
import Home      from "../components/Home";
import Intro      from "../components/Intro";
import Login      from "../components/Login";
import Complaint      from "../components/Complaint";
import AboutApp from "../components/AboutApp";
import ContactUs from "../components/ContactUs";
import Category from "../components/Category";
import Term from "../components/Term";
import Courses from "../components/Courses";
import Lectures from "../components/Lectures";
import Video from "../components/Video";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import Statistics from "../components/Statistics";
import Notification from "../components/Notification";
import Quiz from "../components/Quiz";


const drawerCust = (props) => (<DrawerCustomization {...props} />);

const DrawerNavigator = createDrawerNavigator({
    home                : Home,
	complaint           : Complaint,
	aboutApp            : AboutApp,
	contactUs           : ContactUs,
	logout              : Logout,
	category            : Category,
	term                : Term,
	courses             : Courses,
	lectures            : Lectures,
	video               : Video,
},
{
    initialRouteName    : 'home',
    drawerPosition      : 'right',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '70%',
    contentComponent    : drawerCust
});



const appStack =  createStackNavigator({

	drawerNavigator: {
		screen: DrawerNavigator,
		navigationOptions: {
			header: null
		}
	},
	complaint: {
		screen: Complaint,
		navigationOptions: {
			header: null
		}
	},
	aboutApp: {
		screen: AboutApp,
		navigationOptions: {
			header: null
		}
	},
	contactUs: {
		screen: ContactUs,
		navigationOptions: {
			header: null
		}
	},
	category: {
		screen: Category,
		navigationOptions: {
			header: null
		}
	},
	term: {
		screen: Term,
		navigationOptions: {
			header: null
		}
	},
	courses: {
		screen: Courses,
		navigationOptions: {
			header: null
		}
	},
	lectures: {
		screen: Lectures,
		navigationOptions: {
			header: null
		}
	},
	video: {
		screen: Video,
		navigationOptions: {
			header: null
		}
	},
	logout: {
		screen: Logout,
		navigationOptions: {
			header: null
		}
	},
	profile: {
		screen: Profile,
		navigationOptions: {
			header: null
		}
	},
	editProfile: {
		screen: EditProfile,
		navigationOptions: {
			header: null
		}
	},
	statistics: {
		screen: Statistics,
		navigationOptions: {
			header: null
		}
	},
	notification: {
		screen: Notification,
		navigationOptions: {
			header: null
		}
	},
	quiz: {
		screen: Quiz,
		navigationOptions: {
			header: null
		}
	},

});

const authStack = createStackNavigator({
	intro: {
		screen: Intro,
		navigationOptions: {
			header: null
		}
	},
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },

});

const AppNavigator = createSwitchNavigator({
	InitScreen: {
        screen: InitScreen,
        navigationOptions: {
            header: null
        }
    },
	auth    : authStack,
	app     : appStack,
});

export default createAppContainer(AppNavigator);
