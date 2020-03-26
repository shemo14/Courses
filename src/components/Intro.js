import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager, AsyncStorage} from "react-native";
import { Container, Content} from 'native-base'
import Swiper from 'react-native-swiper';
import styles from '../../assets/styles'
import axios from 'axios';
import CONST from '../consts'
import Spinner from "react-native-loading-spinner-overlay";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Intro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status   : null,
			spinner  : false,
            intro: []
        }
    }

    componentWillMount() {
        this.setState({ spinner  : true });
        axios.get(CONST.url + 'intro').then(response => {
            AsyncStorage.setItem('whats', response.data.extra.whatsapp.toString());
            this.setState({ spinner  : false, intro: response.data.data });
        })
    }


    navigateToLogin() {
        AsyncStorage.setItem('intro', 'true');
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <Container>
				<Spinner visible = { this.state.spinner } />
                <Content>
                        <Swiper dotStyle={[styles.doteStyle]}
                                activeDotStyle={[styles.activeDot]}
							    key={this.state.intro.length}
                                containerStyle={{}} showsButtons={true}
                                buttonWrapperStyle={{top:height-75, height:50 , paddingRight:50 }}
                                prevButton={<View/>}
                                style={{ flexDirection: 'row-reverse' }}
                                nextButton={<Text style={[styles.textBold ,{color:'#fff'}]}>التالي</Text>}
                                autoplay={false} loop={false}>

                            {
                                this.state.intro.map((intro, i) => (
									<View style={{}} key={'_' + i}>
										<Image source={{ uri : intro.image }} style={{height:'100%' , width:'100%' ,zIndex:-1}} resizeMode={'cover'} />
										<View style={[styles.directionColumnCenter , styles.heightFull , styles.Width_60 , styles.flexCenter
											, { zIndex:1, position:"absolute"}]}>
											<Text style={[styles.textBold , styles.text_White , styles.textSize_18, styles.textCenter , styles.marginBottom_5]}>{ intro.title }</Text>
											<Text style={[styles.textRegular , styles.text_White , styles.textSize_14, styles.textCenter]}>{ intro.description }</Text>
                                            {
                                                i+1 == this.state.intro.length ?
													<TouchableOpacity onPress={() => this.navigateToLogin()} style={[styles.orangeBtn]}>
														<Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>ابدأ الآن</Text>
													</TouchableOpacity> :

													<TouchableOpacity onPress={() => this.navigateToLogin()} style={{position:'absolute' , bottom:37 , left:0}}>
											            <Text style={[styles.textBold ,{color:'#fff'}]}>تخطي</Text>
											        </TouchableOpacity>
                                            }

										</View>
									</View>
                                ))
                            }

                        </Swiper>
                </Content>
            </Container>

        );
    }
}

export default Intro;
