import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, View } from "native-base";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Testing</Text>
          </View>
        </Content>
      </Container>
    );
  }
}