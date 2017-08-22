# Next devstack

### Version
0.0.1

### Description
Full-stack next devstack including:

* [Next.js](https://github.com/zeit/next.js/)
* custom [Express](http://expressjs.com/) server
* [Styled components](https://styled-components.com/) for styling

[Next.js tutorial](https://learnnextjs.com/)
[Next.js config examples](https://github.com/zeit/next.js/tree/master/examples)

### Installation
```sh
$ git clone https://github.com/symbio/next-devstack.git
$ yarn
```

##### copy and rename .env.default -> to .env & .env.production and set credentials for various enviroments

### Development
```sh
$ yarn run dev
```

### Build
```sh
$ yarn run build
```

### Production
```sh
$ yarn run start
```