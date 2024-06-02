#!/usr/bin/env bash

print_red () {
    echo -e "\033[0;31m$1\033[0m"
}

print_green () {
    echo -e "\033[0;32m$1\033[0m"
}

print_yellow () {
    echo -e "\033[0;33m$1\033[0m"
}

print_blue () {
    echo -e "\033[0;34m$1\033[0m"
}

# Check to run as root
if [[ $EUID -ne 0 ]]; then
   print_red "This script must be run as root" 
   exit 1
fi

distro=$(awk -F= '/^NAME/{print $2}' /etc/os-release | awk '{print tolower($0)}')
print_blue $distro

current_path=$(pwd)

# Check if apache is installed, if not do it
if command -v apache2 &> /dev/null
then
    print_blue "Apache already installed"
elif command -v httpd &> /dev/null
then
    print_blue "Apache already installed"
else
    case $distro in
        *arch*|*manjaro*)
            print_green "Arch Linux detected"
            pacman -Sy apache
            ;;
        *debian*|*ubuntu*|*pop*|*mint*)
            print_green "Debian detected"
            apt-get update
            apt-get install apache2
            ;;
        *fedora*)
            print_green "Fedora detected"
            dnf install httpd
            ;;
        *centos*)
            if [[ $(awk -F= '/^VERSION_ID/{print $2}' /etc/os-release) == '"8"' ]]
            then
                print_green "CentOS 8 based OS detected"
                dnf install httpd
            else
                print_green "CentOS 7 based OS detected"
                yum install httpd
            fi
            ;;
        *redhat*|*rhel*)
            print_green "Red Hat detected"
            yum install httpd
            ;;
        *)
            echo "OS not detected, try to install apache manually."
            exit 1
            ;;
    esac
fi

# Install npm
if command -v npm &> /dev/null
then
    print_blue "npm already installed"
else
    case $distro in
        *arch*|*manjaro*)
            print_green "Arch Linux detected"
            pacman -Sy npm
            ;;
        *debian*|*ubuntu*|*pop*|*mint*)
            print_green "Debian detected"
            apt-get update
            apt-get install npm
            ;;
        *fedora*)
            print_green "Fedora detected"
            dnf install npm
            ;;
        *centos*)
            print_green "CentOS detected"
            yum install npm
            ;;
        *redhat*|*rhel*)
            print_green "Red Hat detected"
            yum install npm
            ;;
        *)
            print_red "OS not detected, try to install npm manually."
            exit 1
            ;;
    esac
fi

# Go to root of project
cd "$(git rev-parse --show-toplevel)"

# Pull latest changes from git
git pull

# Install npm packages
npm install

# Build the project
npm run build

# Find the apache root directory
apache_root_dir=$(grep -E '^DocumentRoot\s+(.+)$' /etc/httpd/conf/httpd.conf | cut -d' ' -f2- | sed 's/^"//; s/"$//' || grep -E '^DocumentRoot\s+(.+)$' /etc/apache2/apache2.conf | cut -d' ' -f2- | sed 's/^"//; s/"$//')

# Copy the build to apache
rm -rf $apache_root_dir/*
cp -r dist/* $apache_root_dir

# Restart apache
if command -v apache2 &> /dev/null
then
    systemctl restart apache2
elif command -v httpd &> /dev/null
then
    systemctl restart httpd
fi