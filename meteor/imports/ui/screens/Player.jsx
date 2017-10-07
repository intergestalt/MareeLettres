import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import HiddenField from 'uniforms-unstyled/HiddenField';
import SubmitField from 'uniforms-unstyled/SubmitField';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import ReactTable from 'react-table';
import { OriginId, AvailableLetters } from 'maree-lettres-shared';
import _ from 'underscore';

import { Challenges, ChallengesSchema } from '../../api/challenges/challenges';
import { Proposals } from '../../api/proposals/proposals';
import { Players, PlayersSchema } from '../../api/players/players';

import AdminWrapper from '../components/AdminWrapper';

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.origin_id = props.params.orgin_id;
    this.saveCallback = this.saveCallback.bind(this);
  }

  save(doc) {
    console.log(doc);
    if (!doc._id) {
      Players.insert(doc, this.saveCallback);
    } else {
      Players.update(doc._id, {
        $set: {
          blocked: doc.blocked,
        },
      },
        this.saveCallback,
      );
    }
  }

  saveCallback(error, data) {
    if (error) {
      alert("ERROR - NOT SAVED")
    }
    else {
      // this.props.router.push('/admin/players')
    }
  }

  renderDetails() {
    if (!this.props.dataIsReady) return;
    const player = this.props.player;
    console.log(player)
    return (
      <div style={{ padding: "20px" }}>
        <ReactTable
          style={{ width: "50%", float: "left" }}
          data={player.proposals}
          columns={[{
            Header: 'Proposals Id',
            accessor: '_id',
            Cell: props => <span className="impact"> {this.props.proposals_by_id[props.row._id].text} </span>,
          },
          {
            Header: 'Challenge Id',
            accessor: 'challenge_id',
          }]}
          defaultPageSize={player.proposals.length}
          showPagination={false}
        />
        <ReactTable
          data={Object.entries(player.votes)}
          columns={[{
            Header: 'Proposal Id',
            id: 'proposal_id',
            accessor: d => (d[0]),
            Cell: props => <span className="impact"> {this.props.proposals_by_id[props.row.proposal_id].text} </span>,
          },
          {
            Header: 'Value',
            id: 'value',
            accessor: d => (d[1] ? "Yes" : "No"),
          }]}
          defaultPageSize={Object.keys(player.votes).length}
          showPagination={false}
        />
      </div>
    );
  }

  renderEditForm() {
    return (
      <AutoForm
        schema={PlayersSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.player}
      >
        <AutoField name="blocked" />
        <ErrorsField />
        <SubmitField />
      </AutoForm>
    );
  }

  render() {
    return (
      <AdminWrapper>
        <h2>Edit Player</h2>
        {this.renderEditForm()}
        {this.renderDetails()}
      </AdminWrapper>
    );
  }
}

export default createContainer((props) => {
  const dataHandle = Meteor.subscribe('get.player', { origin_id: props.params.origin_id });
  const player = Players.findOne({ origin_id: props.params.origin_id });
  const dataIsReady = dataHandle.ready();

  console.log(player)
  if (player) {
    const player_vote_proposals = player.votes ? Object.keys(player.votes) : [];
    const player_own_proposals = _.pluck(player.proposals, '_id')
    Meteor.subscribe('get.proposals/proposal_ids/text', player_vote_proposals.concat(player_own_proposals))
  }

  const proposals_by_id = _.indexBy(Proposals.find().fetch(), '_id');

  return {
    player,
    dataIsReady,
    proposals_by_id,
  };
}, PlayerPage);
