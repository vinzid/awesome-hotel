## Awesome Hotel
Use [React](react) to develop


### Software
Necessary software and the version used in development
- [Node](node) v14.17.0
- [yarn](yarn) v1.22.10

### Install
Install the dependency
>yarn

### Run
Compile and start
>yarn start

### Test
Test for the app
>yarn test

### Access
Visit via browser
>http://localhost:3000

### Functionality
The main functionality of this app is as follow:
1. Display the basic information of hotels, with or without the price, and the hotels without price will be displayed lastly.
2. The price make includes tax and hotel fees, which will indicated by the asterisk besides the price, and the details will shown when hover.
3. The competitors table may be available, and are ordered by ascending price, with the saving with us percentage if the price is higher than us.
4. If the description is more than a paragraph, only the first paragraph will be shown at first, with the "Read More" link to show all, then "Read Less" link to shrink.
5. Default currency is U.S. Dollar or the last selected currency, a different currency can be switched by selecting a dropdown option.
6. If there're errors when request data, error message will be shown. If the prices request failure for the first time, the hotel list will be shown without any price.



[react]: https://reactjs.org
[node]: https://nodejs.org
[yarn]: https://yarnpkg.com