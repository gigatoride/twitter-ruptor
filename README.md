# Twitter Ruptor

[![GitHub license](https://img.shields.io/github/license/gigatoride/twitter-ruptor.svg)](https://github.com/gigatoride/twitter-ruptor/blob/master/LICENSE)

Simple brute force tool for twitter using phone numbers.

## Usage

Clone the git repository with
```
git clone https://github.com/gigatoride/twitter-ruptor.git
```
Quick help for options and commands
```
npm start
```

### Commands

Options|||
----|----|----
-v|--version|output the version number
-h|--help|output usage information

Run the tool with the following command

```
node index b -c 1 -l 11 success.txt
```

#### Notes

* A zero is automatically generated before the phone number
* The command-line log will not display the country code, It's only used in username.

### MongoDB Link

Rename **.env.example** to **.env**
Then update the following values

```
MONGODB_URL=your_database_URL
DATABASE_NAME=your_database_name
```

Then run the tool with the following command

```
node index b -c 2 -l 11 results.txt -d
```

## Bugs
Open a [new issue](https://github.com/gigatoride/twitter-ruptor/issues/new)
