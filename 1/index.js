const inputs = {
  totalVoters: 1000,
  voteTypes: {
    valids: {
      key: 'ValidVotes',
      label: 'dos votos válidos',
      quantity: 800,
    },
    whiteVotes: {
      key: 'WhiteVotes',
      label: 'de brancos',
      quantity: 150,
    },
    nulls: {
      key: 'NullVotes',
      label: 'de nulos',
      quantity: 50,
    },
  },
};

class Voters {
  getPercentValidVotes(validVotes, totalVoters) {
    return (validVotes / totalVoters) * 100;
  }

  getPercentWhiteVotes(whiteVotes, totalVoters) {
    return (whiteVotes / totalVoters) * 100;
  }

  getPercentNullVotes(nullVotes, totalVoters) {
    return (nullVotes / totalVoters) * 100;
  }
}


// * listar os resultados a partir dos inputs
function logResults() {
  const voters = new Voters();

  const voteTypes = Object.keys(inputs.voteTypes);

  for (const voteType of voteTypes) {
    const voteTypeInfo = inputs.voteTypes[voteType];

    const getVotePercent = voters[`getPercent${voteTypeInfo.key}`];

    const percent = getVotePercent(voteTypeInfo.quantity, inputs.totalVoters);

    console.log(
      `\nO percentual ${voteTypeInfo.label} em relação ao total de eleitores é de: ${percent.toFixed(
        2
      )}%\n`
    );
  }
}

logResults();
