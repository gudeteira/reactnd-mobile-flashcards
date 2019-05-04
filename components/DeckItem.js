import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Avatar, Card, Paragraph, Title, TouchableRipple} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {Theme} from '../theme/theme';

class DeckItem extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired
  };
  // static defaultProps = {
  //   deck: {}
  // };

  render() {
    const {deck, navigation} = this.props;
    return (
      <View style={Theme.homeContainer}>
        <Card elevation={5}>
          <Card.Content>
            <TouchableRipple onPress={() => navigation.navigate('Deck', {deckId: deck.id})}
                             rippleColor="rgba(224, 224, 224, 0.68)">
              <View>
                <View>
                  <Avatar.Text size={50} label={deck.name.substring(0, 2)}/>
                </View>
                <View>
                  <Title>{deck.name}</Title>
                  <Paragraph>{Object.keys(deck.questions).length} questions</Paragraph>
                </View>
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default withNavigation(DeckItem);
