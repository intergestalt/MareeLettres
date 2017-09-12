import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import { OriginId } from 'maree-lettres-shared';
import ReactTable from 'react-table'
import Moment from 'react-moment';
import 'moment-timezone';

import { Players, PlayersSchema } from '../../api/players/players';
import { Proposals } from '../../api/proposals/proposals';
import ProposalEntry from '../components/ProposalEntry';
import PlayerCell from '../components/PlayerCell'

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';

Session.setDefault('playersListLimit', 10);
Session.setDefault('playersListSort', { last_seen: -1 });

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    Session.set('playersListLimit', this.props.limit || 10);
    this.state = {};
    this.fetchData = this.fetchData.bind(this);
  }

  more = () => {
    Session.set('playersListLimit', Session.get('playersListLimit') + 100);
  };

  fetchData(state, instance) {

    Session.set('playersListLimit', state.pageSize);
    Session.set('playersListSort', { [state.sorted[0].id]: (state.sorted[0].desc ? -1 : 1) });
  }

  render() {

    const columns = [{
      Header: 'Player',
      accessor: 'origin_id',
      Cell: props => <PlayerCell origin_id={props.row.origin_id} />,
    }, {
      Header: 'Last Seen',
      accessor: 'last_seen_at',
      Cell: props => <Moment format="DD.MM.YY HH:MM" tz="Europe/Paris">{props.row.last_seen_at}</Moment>,
    }, {
      Header: 'Created At',
      accessor: 'created_at',
      Cell: props => <Moment format="DD.MM.YY HH:MM" tz="Europe/Paris">{props.row.created_at}</Moment>,
    }, {
      Header: 'banned',
      accessor: 'banned',
    }];

    return (
      <AdminWrapper>
        <Menu />
        <h1>Players</h1>
        <ReactTable
          data={this.props.players}
          columns={columns}
          manual
          onFetchData={this.fetchData}
          defaultPageSize={Session.get('playersListLimit')}
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  style={{ width: "50%", float: "left" }}
                  data={row.original.proposals}
                  columns={[{
                    Header: 'Proposals Id',
                    accessor: '_id',
                  },
                  {
                    Header: 'Challenge Id',
                    accessor: 'challenge_id',
                  }]}
                  defaultPageSize={row.original.proposals.length}
                  showPagination={false}
                />
                <ReactTable
                  data={Object.entries(row.original.votes)}
                  columns={[{
                    Header: 'Proposal Id',
                    id: 'proposal_id',
                    accessor: d => (d[0]),
                  },
                  {
                    Header: 'Value',
                    id: 'value',
                    accessor: d => (d[1] ? "Yes" : "No"),
                  }]}
                  defaultPageSize={Object.keys(row.original.votes).length}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
      </AdminWrapper>
    );
  }
}

export default createContainer((props) => {
  const sort = Session.get('playersListSort');
  const options = {
    limit: Session.get('playersListLimit'),
    fields: { origin_id: 1, _id: 1, last_seen: 1, created_at: 1, proposals: 1, votes: 1 },
    sort,
  };

  Meteor.subscribe('get.players', options);

  return {
    players: Players.find({}, options).fetch(),
  };
}, PlayersPage);
