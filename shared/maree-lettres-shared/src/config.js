const config = {
  user_key_phone_code: 'oAmQRC', // random key to mark a string as a valid origin id from phone
  user_key_other_code: 'zsl25y', // random key to mark a string as a valid origin id from string
  user_key_code_length: 6, // length of the codes above
  user_key_secret: 'kYB1rIzSjbEhKEMAFCvx', // random key used for encryption between server and client
  available_characters_proposals: 'AAABCDEEEEFGHIIJKLLMNNOOPPQQRRSSSTTUUVWXYZ?*:', // all the physical letters
  available_letters_primary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // letter vailable for personal choice
  available_letters_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // letters allowed on map
};

export default config;
