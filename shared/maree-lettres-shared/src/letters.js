import config from './config/config';

const AvailableLetters = {};

AvailableLetters.proposal = config.available_characters_proposals;
AvailableLetters.primary = config.available_letters_primary;
AvailableLetters.map = config.available_letters_map;

export { AvailableLetters };
