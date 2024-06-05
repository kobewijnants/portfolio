#!/usr/bin/env bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
END='\033[0m'

print_colored() {
    echo -e "${1}${2}${END}"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_colored "${RED}This script must be run as root${END}"
        exit 1
    fi
}

get_distro() {
    distro=$(awk -F= '/^NAME/{print $2}' /etc/os-release | awk '{print tolower($0)}')
    print_colored "${BLUE}$distro${END}"
}

check_apache() {
    if command -v apache2 &>/dev/null; then
        print_colored "${GREEN}Apache already installed${END}"
    elif command -v httpd &>/dev/null; then
        print_colored "${GREEN}Apache already installed${END}"
    else
        case $distro in
            *arch* | *manjaro*)
                print_colored "${GREEN}Arch based OS detected${END}"
                pacman -Sy apache curl
                ;;
            *debian* | *ubuntu* | *pop* | *mint*)
                print_colored "${GREEN}Debian based OS detected${END}"
                apt-get update -y
                apt-get install apache2 curl -y
                ;;
            *fedora*)
                print_colored "${GREEN}Fedora detected${END}"
                dnf install httpd curl
                ;;
            *centos*)
                if [[ $(awk -F= '/^VERSION_ID/{print $2}' /etc/os-release) == '"8"' ]]; then
                    print_colored "${GREEN}CentOS 8 based OS detected${END}"
                    dnf install httpd curl
                else
                    print_colored "${GREEN}CentOS 7 based OS detected${END}"
                    yum install httpd curl
                fi
                ;;
            *redhat* | *rhel*)
                print_colored "${GREEN}Red Hat detected${END}"
                yum install httpd curl
                ;;
            *)
                echo "OS not detected, try to install apache manually."
                exit 1
                ;;
        esac
    fi
}

install_nvm() {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
}

go_to_project_root() {
    cd "$(git rev-parse --show-toplevel)"
}

pull_latest_changes() {
    if ! git pull; then
        print_colored "${RED}Error pulling latest changes from git${END}"
        exit 1
    fi
}

install_npm_packages() {
    npm install
}

build_project() {
    npm run build
}

find_apache_root_dir() {
    case $distro in
        *arch* | *manjaro*)
            apache_root_dir="/srv/http"
            ;;
        *debian* | *ubuntu* | *pop* | *mint*)
            apache_root_dir="/var/www/html"
            ;;
        *fedora*)
            apache_root_dir="/var/www/html"
            ;;
        *centos*)
            apache_root_dir="/var/www/html"
            ;;
        *redhat* | *rhel*)
            apache_root_dir="/var/www/html"
            ;;
        *)
            print_colored "${RED}OS not detected, try to find the apache root directory manually.${END}"
            exit 1
            ;;
    esac
}

copy_build_to_apache() {
    rm -rf "$apache_root_dir"/*
    cp -r dist/* "$apache_root_dir"
}

restart_apache() {
    if command -v apache2 &>/dev/null; then
        systemctl restart apache2
    elif command -v httpd &>/dev/null; then
        systemctl restart httpd
    fi
}

# Main script
check_root
get_distro
check_apache
install_nvm
go_to_project_root
pull_latest_changes
install_npm_packages
build_project
find_apache_root_dir
copy_build_to_apache
restart_apache
