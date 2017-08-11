ROOT=$PWD
if [ "$1" != "" ] && [ "$2" != "" ]; then
    KIT_PATH=$1/react-redux-starter-kit
    COMMIT_HASH=`(git -C $KIT_PATH log --pretty=format:'%h' -n 1)`
    echo $COMMIT_HASH
    BRANCH_NAME=`(git rev-parse --abbrev-ref HEAD)`
    ARCHIVE_NAME=rrsk-$BRANCH_NAME-$COMMIT_HASH.tar.gz
    echo $ARCHIVE_NAME

    cd $KIT_PATH; tar -czvf "./$ARCHIVE_NAME" \
        --exclude='*.pyc' \
        --exclude='*module-cache*' \
        --exclude='*test*' \
        --exclude='.DS_Store' \
        --exclude='*.git' \
        --exclude='node_modules' \
        .

    echo "installing react-redux-starter-kit in $ROOT/$2"
    mkdir -p $ROOT/$2
    tar -xzf $1/$ARCHIVE_NAME -C $ROOT/$2
else
    echo "usage: ./start_rrsk.sh {parent directory of react-redux-starter-kit} {name-of-app}"
    echo "example: ./start_rrsk.sh .. reducksapp"
fi