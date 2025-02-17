import { Container } from "@chakra-ui/react";
import React, { Component } from "react";
import { NavBar } from "./navbar/NavBar";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBar />
        <Container maxW="4xl">{this.props.children}</Container>
      </div>
    );
  }
}
