import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import { OriginId } from 'maree-lettres-shared';
import ReactTable from 'react-table'

import { Players, PlayersSchema } from '../../api/players/players';
import { Proposals } from '../../api/proposals/proposals';
import ProposalEntry from '../components/ProposalEntry';
import PlayerCell from '../components/PlayerCell'

import Menu from '../components/menu';

Session.setDefault('playersListLimit', 100);

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    Session.set('playersListLimit', this.props.limit || 100);
    this.state = {};
  }

  more = () => {
    Session.set('playersListLimit', Session.get('playersListLimit') + 100);
  };

  render() {

    console.log(this.props.players)

    const columns = [{
      Header: 'Player',
      accessor: 'origin_id',
      Cell: props => <PlayerCell origin_id={props.row.origin_id} />
    }, {
      Header: 'Letter',
      accessor: 'primary_letter',
    }, {
      //accessor: 'secondary_letters', 
      Header: '1',
      accessor: 'secondary_letters[0]', 
      //accessor: d => d.secondary_letters[] // Custom value accessors!
    }, {
      Header: 'Last Seen',
      accessor: 'last_seen'
    }, {
      Header: 'Created At',
      accessor: 'created_at'
    }, {
      Header: 'banned',
      accessor: 'banned'
    }]



    return (
      <div>
        <Menu />
        <h1>[in progress]</h1>
        <ReactTable
          data={this.props.players}
          columns={columns}
        />
      </div>
    );
  }
}

export default createContainer((props) => {
  console.log(this);
  Meteor.subscribe('get.players', {
    limit: Session.get('playersListLimit'),
    fields: { origin_id:1, _id:1, last_seen:1, created_at:1, primary_letter:1, secondary_letters:1 },
    sort: { last_seen: -1 },
  });

  return {
    players: Players.find().fetch(),
  };
}, PlayersPage);
