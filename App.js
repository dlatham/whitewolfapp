/**
 * Whitewolf App
 * github link here
 * Dave Latham
 */

import React, { Component } from 'react';
import { Slider, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, Button, Icon, Title, Text, Badge, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import { TabNavigator, TabBarBottom } from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Whitewolf</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>

        <Content>
          <Text>This is the home screen</Text>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}

class LightingScreen extends Component {
  constructor(props) {
   super(props)
   this.state = { 
    r: 255,
    g: 255,
    b: 200,
    colorHolder: 'rgb(255,255,200)' }
  }
  getRVal(val){
    this.setState({ 
      r: val
    })
    var colorCode = 'rgb(' + val + ', ' + this.state.g + ', ' + this.state.b + ')';
    //console.warn(val.toFixed(0));
    this.setState({
      colorHolder: colorCode
    })
  } 
  getGVal(val){
    this.setState({ 
      g: val
    })
    var colorCode = 'rgb(' + this.state.r + ', ' + this.state.g + ', ' + this.state.b + ')';
    //console.warn(val.toFixed(0));
    this.setState({
      colorHolder: colorCode
    })
  }
  getBVal(val){
    this.setState({ 
      b: val
    })
    var colorCode = 'rgb(' + this.state.r + ', ' + this.state.g + ', ' + this.state.b + ')';
    //console.warn(val.toFixed(0));
    this.setState({
      colorHolder: colorCode
    })
  }
  sendValues(){
    var url = 'http://10.83.0.102/color?r=' + this.state.r + '&g=' + this.state.g + '&b=' + this.state.b;
    fetch(url)
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Whitewolf</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>

        <Content style={{backgroundColor: this.state.colorHolder}}>
          <Badge>
            <Text>ONLINE</Text>
          </Badge>
        
          <Slider 
            style={styles.slider}
            maximumValue={255}
            minimumValue={0}
            value={this.state.r}
            onValueChange={val => this.getRVal(Math.round(val))}
            onSlidingComplete={() => this.sendValues()}
          />
          <Text>{this.state.r}</Text>

          <Slider 
            style={styles.slider}
            maximumValue={255}
            minimumValue={0}
            value={this.state.g}
            onValueChange={val => this.getGVal(Math.round(val))}
            onSlidingComplete={() => this.sendValues()}
          />
          <Text>{this.state.g}</Text>

          <Slider 
            style={styles.slider}
            maximumValue={255}
            minimumValue={0}
            value={this.state.b}
            onValueChange={val => this.getBVal(Math.round(val))}
            onSlidingComplete={() => this.sendValues()}
          />
          <Text>{this.state.b}</Text>


        </Content>

        
      </Container>
      </StyleProvider>
    );
  }
}

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Lighting: { screen: LightingScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `anchor`;
        } else if (routeName === 'Lighting') {
          iconName = `bulb`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon active name={iconName} type="SimpleLineIcons" style={{fontSize: 20, color: tintColor}} />;
      },
    }),
    tabBarOptions: {
      inactiveBackgroundColor: '#30323D',
      activeBackgroundColor: '#EAF1F9',
      activeTintColor: '#089FDA',
      inactiveTintColor: '#EAF1F9',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const styles = StyleSheet.create({
  slider: {
    width: 350,
    marginLeft: 10,
  }
});