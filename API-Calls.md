#Documentation of the API calls

Always: For every call: Only if the isInternalLoading flag is false. To assure, the API is not called twice

#Content

- Navigate to Info screen
Condition: If timeout or content empty (first loaded)


#Challenges

- Challenges List did mount
- Navigate to Challenges List via Tab 
- Navigate to Challenges List via Challenge Selector
Condition: If timeout or content empty (first loaded)


#Challange

- In Challenges List 
- In Challenge Selector
Condition: If ticker == 0. 
Comment: Check if challenge is stil existing. If not: navigate to first item, if existing or to Challenges List if there is no challenge at all.


#Proposals

- Navigate to Challenge Selector via Tab
- Navigate to Challenge Selector via Challenges List
- Select Tinder Mode
- Select List Mode
- Change List View (Most, Trending, Newest)
Condition: If timeout or content empty (first loaded)
Comment: Always three lists are loaded, for the selected challenge and his neigbours

- On Swipe Down.
Comment: Only the proposals of the selected challenge.
???: Introduce a mini time out, not to load this to often?

- On Scroll Down
Condition: The List is scrolled down almost ot the end and if the last time this was called some new proposals where loaded. If not: only if timeout or the list is first loaded (empty.
Comment: Only the proposals of the selected challenge. Limit is increased every time.

- On Tinder Vote
Condition: Almost all proposals are voted via tinder and if the last time this was called some new proposals where loaded. If not: only if timeout or the list is first loaded (empty.
Comment: Only the proposals of the selected challenge. If loaded proposals are already internal voted: delete them from list.

# Votes

Always: Only if there are internal votes not sent

- Ticker
Condition: There are more then n votes. Or: The last vote was some seconds ago.
- If there is a navigation
- If the application goes to background
- If the application comes to foreground
- If the app starts (should be the same as last point)
