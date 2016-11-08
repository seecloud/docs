Quick Start Guide
=================

This guide goes through the process step-by-step and provides assistance in how
to bootstrap and configure the system.


Build Installation ISO
----------------------

Infrastructure nodes have to be installed with the required set of packages,
such as Ansible, Docker and GlusterFS on Centos7 based OS. To build an ISO for
offline installation *os-image-builder* have to used.


Recommended Environment
^^^^^^^^^^^^^^^^^^^^^^^

The image builder was tested on Ubuntu 16.04 x64 with the following installed
packages:

========  =======  ===========
Name      Version  Description
========  =======  ===========
Packer    0.11.0   Image building tool (https://www.packer.io/docs/installation.html)
QEMU-KVM  2.5      Machine emulator and virtualizer
GnuPG     1.4
========  =======  ===========


Prepare Environment
+++++++++++++++++++

To install the necessary packages run the next command::

    sudo apt-get install gnupg qemu-kvm

Packer can be installed by getting pre-built binary from the officially site,
to download a ZIP archive run the following command::

    curl -O https://releases.hashicorp.com/packer/0.11.0/packer_0.11.0_linux_amd64.zip

And then unpack it into your home directory using `unzip`::

    unzip packer_0.11.0_linux_amd64.zip packer -d ~/


Generate GPG Keyring (Optional)
+++++++++++++++++++++++++++++++

.. WARNING::
    This is supported only for Ubuntu based ISO and have to be skipped this
    section in case of building Centos based ISO.

Before running the image builder for the first time please generate a new key
pair::

    $ gpg --gen-key

Follow the prompts to specify your name, email, and other items.

Make sure you can find `pubring.gpg` and `secring.gpg` files under
the $HOME/.gnupg directory. Also, you should be able to see your newly
generated keys by issuing `gpg -k` and `gpg -K` commands to list keys from
the public and secret keyrings accordingly.

.. NOTE::
    This keypair will be used to sign repository inside of ISO.


Build ISO
^^^^^^^^^

The build process was tested only with Centos 7 Minimal ISO
(`CentOS-7-x86_64-Minimal-1511.iso`). This ISO can be downloaded using the list
of mirrors http://isoredirect.centos.org/centos/7/isos/x86_64/.

The image builder have to be cloned to build an installation ISO::

    git clone https://github.com/seecloud/os-image-builder


Local parameters have to be set before to proceed::

    cat > ~/parameters.yaml << EOF
    {
        "iso": "/home/ubuntu/CentOS-7-x86_64-Minimal-1511.iso",
        "iso_md5": "88c0437f0a14c6e2c94426df9d43cd67",
        "dst_iso": "/home/ubuntu/build/ms-centos-7.iso",
        "user": "mirantis",
        "password": "mirantis"
    }
    EOF

Where parameters are:

========  ===========
Name      Description
========  ===========
iso       An absolute path to the CentOS installation CD image.
iso_md5   A MD5SUM of ISO which is used for verification before the build.
dst_iso   An absolute path to the resulting image.
user      An username for an account which will be configured in kickstart of
          the resulting ISO and will be created during installation of OS.
password  A password for the mentioned account.
========  ===========

To build an ISO using specified parameters in `parameters.json` run the next
command::

    ~/packer build -var-file ~/parameters.json -only qemu centos7.json

As a result the newly built ISO will be available at `~/build/ms-centos-7.iso`
and can be used to deploy Managed Services appliance.
