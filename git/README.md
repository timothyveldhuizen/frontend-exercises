# Git exercises
Git the source control version manager.
There are good IDE's that support git and this way you don't have to use the command line for git.
But here some handy git commands are described to practice with the command line.

## Install Git
You can download and install git [here](https://git-scm.com/downloads)
Or follow these steps to install git from the command line [here](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git)

Check if git is installed by running `git --version`

Now before you can do any commits you should your identity that is used for all your commits.
```
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"
```

To see your config and that your identiy is added run `git --config list`, now you should see something like
```
user.email=johndoe@example.com
user.name=John Doe
```

More about configuration later...

## Locally start a project with Git
Go to the root folder of your new code project and run `git status`.
Probably it will fail because it is not tracked by Git yet.
So run `git init` to initalize git for this code project.
When you run `git status` now, you will see some result from Git.

### Or just clone
The other way is to already start a new code project in some of the many online Git repositories (Bitbucket, GitHub etc.)
All you have to do is `git clone http://someurl/to/a/repo.git`

More info: https://git-scm.com/book/en/v1/Git-Basics-Getting-a-Git-Repository

## Git add, commit, .gitignore
Off course you have a readme.md file in your code project. But now you want to add and commit this.
To track the readme run `git add readme.md`, your file is now staged.
And then followed by `git commit -m "My first commit"` to commit your staged changes to your local git repository.

To track all the files in your code project you can simply do `git add --all`.
But make sure you have a proper `.gitignore` file to prevent you from adding unnecessary files to your git repository.

More information about .gitignore: https://help.github.com/en/articles/ignoring-files

## Git connect and push to remote repo
To connect your local repo to the remote repo do `git remote add http://someurl/to/a/repo.git`
Note: If you cloned the project `git clone http://someurl/to/a/repo.git` then this is not necessary anymore, as it is already connected.

To double check if everything is alright do a `git remote show origin`, this should something like this
```
* remote origin
  Fetch URL: http://someurl/to/a/repo.git
  Push  URL: http://someurl/to/a/repo.git
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

So you can see now that your remote shortname is `origin` and the branch `master`, so officially you run `git push <remote> <branch>` as in `git push origin master`
But for now you can do `git push` to push your commits from your local repo to the remote one.
This because you only have one remote and one branch.

More info: https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes

## Git fetch and pull
To see if there are any update in the git tracking you can do a `git fetch`
This will update your local tracking information with the remote one. It will not merge or update your code files.
E.g. if someone committed new changes or created new branches.

To pull in all changes from remote do a `git pull`, this will update the tracking information and your code files.

## Viewing git log
One of the handy features of Git is that you can track all change history in branches and commits.
So `git log` shows you this. If you want quick overview and commits per line you can run `git log --pretty=oneline`

More information: https://git-scm.com/book/en/v1/Git-Basics-Viewing-the-Commit-History

## Git Config
There are a lot of config settings you can set in Git, but one handy for cross-environment coding is `git config --global core.autocrlf true`
On a Windows machine this will enable Git to auto convert line endings CRLF (from Windows) into LF (macOs/Linux) when you add or checkout files.

Also this prevents you from Git to think local and remote files are different only because of different CRLF or LF line endings.

Note: On a macOs/Linux machine it could happen you checkout a file that has CRLF endings, you can also only convert on commit with `git config --global core.autocrlf input`.

More info: https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration