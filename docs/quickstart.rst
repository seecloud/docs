.. _quickstart-guide:

OSS Tooling Quick Start Guide
=============================

Mirantis Operational Support System Tooling, or OSS Tooling, is a software
platform that enables Mirantis Managed Services engineers to access remote
cloud environments at customer site and monitor and troubleshoot
these environments as required.

This document provides step-by-step instructions on how to configure
build the ISO image that you will later use to deploy the Mirantis OSS Tooling
appliance.

.. _qs-prerequisites:

Prerequisites
~~~~~~~~~~~~~

You can install Mirantis OSS Tooling from an ISO image provided
by the automated build system. Alternatively, you can build your own ISO
image. A pre-built image already includes a set of required packages. If you
decide to build your own ISO, the latest versions of required packages are
automatically installed in the ISO image.

.. note::
   The automated build ISOs are not yet supported. Therefore, you must build
   the ISO manually.

The following table describes the prerequisites for the manually-built ISO
image.

.. list-table:: **Prerequisites for the manually built ISO image**
   :widths: 10 25
   :header-rows: 1

   * - Parameter
     - Description
   * - Building environment
     - Ubuntu 16.04 x64 with the following software packages:

       * Packer 0.11.0
       * QEMU-KVM 2.5
       * GnuPG 1.4

       The building environment must have an Internet access.

   * - Base operating system for the ISO image
     - CentOS 7 or Ubuntu 16.04 x64.

       Although, you can use Ubuntu as a base operating system for
       the Mirantis Managed Services Tooling bootstrap image, CentOS is
       preferred.

       The current supported image is *Centos 7 Minimal ISO*.

.. seealso::

   * :ref:`qs-required-packages`
   * `CentOS Minimal ISO mirrors <http://isoredirect.centos.org/centos/7/isos/x86_64/>`_

.. _qs-required-packages:

ISO image packages
------------------

When you build an OSS ISO image, a specific set of packages is automatically
installed on the base operating system of the ISO image. The latest packages
are used automatically.

This set of packages is different from the packages required for the
building environment described in :ref:`qs-prepare-env`.

The OSS Tooling ISO image includes the following packages:

.. list-table:: **Required packages**
   :widths: 10 25
   :header-rows: 1

   * - Package
     - Description
   * - ``vim-enhanced``
     - A text editor
   * - ``tcpdump``
     - A tool that prints out information about network packages on a
       specified network interface.
   * - ``ansible``
     - An IT automation engine
   * - ``docker-latest``
     - A lightweight container building tool
   * - ``git``
     - Version control system
   * - ``nginx``
     - [Pronounced as **'engine-x'**] An HHTP and reverse proxy server
   * - ``mlocate``
     - A file search tool
   * - ``mc``
     - A visual file manager called Midnight Commander.
   * - GlusterFS packages:

       * ``glusterfs``
       * ``glusterfs-api``
       * ``glusterfs-cli``
       * ``glusterfs-client-xlators``
       * ``glusterfs-fuse``
       * ``glusterfs-libs``
       * ``glusterfs-server``

     - GlusterFS packages that provide a scalable network file system that
       enables creation of distributed storage volumes.
   * - ``keepalived``
     - A routing software that provides load balancing and high avilability.
   * - Python packages:

       ``python-pip``
       ``python-docker-py``
       ``python-gluster``
       ``python-httplib2``
       ``python-IPy``

     - A set of Python packages that is required for the correct program
       execution.
   * - ``bash-completion``
     - A tool that enables partial command completion by typing a few first
       letters of the command and then pressing the **TAB** key.
   * - ``socat``
     - A relay for bidirectional data transfer
   * - ``libselinux-python``
     - A set of Python bindings for SELinux required by Ansible.
   * - ``wget``
     - A tool for downloading files from the Internet.
   * - ``device-mapper-libs``
     - An utility tjat enables mapping of physical block devices to virtual.
   * - ``policycoreutils-python``
     - The package includes management utilities for SELinux environments. 
   * - ``setools-libs``
     - A set of tools for SELinux policy analysis.

.. _qs-prepare-env:

Prepare the building environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before you can build the OSS Tooling ISO, you need to prepare
your building environment by installing the required packages.

**To prepare the building environment:**

#. Install GnuPG and QEMU-KVM:

   ::

     sudo apt-get install gnupg qemu-kvm

#. Install packer by downloading the pre-built binary file from the offical
   web-site:

   #. Download the ``.zip`` archive:

      ::

        curl -O https://releases.hashicorp.com/packer/0.11.0/packer_0.11.0_linux_amd64.zip

   #. Unpack the archive into your home directory using ``unzip``:

      ::

        unzip packer_0.11.0_linux_amd64.zip packer -d ~/

#. If you use Ubuntu as a building environment, proceed to
   :ref:`qs-generate-gpg-key`.

.. _qs-generate-gpg-key:

Generete a new GPG key
----------------------

.. warning::
   If you use CentOS as a base OS for your bootstrap image, skip this section.

Before building an ISO, generate a new GPG key pair using
GnuPG. This GPG key will be used to sign the repository inside the ISO image.

**To generate a new public GPG:**

#. Generate a new key pair using the ``gpg`` command:

   ::

     gpg --gen-key

#. Specify your name, email address, and other parameters as prompted.
#. Verify that the new key has been successfully generated:

   * Check that the ``$HOME/.gnupg`` directory includes the ``pubring.gpg``
     and ``secring.gpg`` files.

   * If you have generated a public key, view the list of public keys by
     running:

     ::

       gpg -k

   * If you have generated a private key, view the list of private keys by
     running:

     ::

       gpg -K

.. _qs-build-bootstrap-image:

Build an OSS Tolling ISO image
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After preparing your environment as described in
:ref:`qs-prepare-env`, you can build
an OSS Tooling ISO image.

**To build an OSS Tooling ISO image:**

#. Download the recommend base OS image. Supported versions are
   listed in :ref:`qs-prerequisites`.
#. Copy the downloaded base OS image to a directory in your build
   environment.
#. Clone the image builder source code from the GitHub repository:

   ::

     git clone https://github.com/seecloud/os-image-builder

#. Open the ``~/parameters.yaml`` for editing.
#. Set the following parameters.

   .. list-table:: **Prerequisites for the manually-built ISO image**
      :widths: 10 25
      :header-rows: 1

      * - Parameter
        - Description
      * - ``iso``
        - An absolute path to the CentOS installation CD image.
      * - ``iso_md5``
        - A MD5SUM of the ISO image that is used to verify the
          integrity of the ISO image before starting the build.
      * - ``dst_iso``
        - An absolute path to the created ISO image.
      * - ``user``
        - A username for an account which that the image building tool
          configures for the created ISO image.
      * - ``password``
        - A password for the user mentioned above.

   **Example:**

   :: 

     cat > ~/parameters.yaml << EOF
     {
         "iso": "/home/ubuntu/CentOS-7-x86_64-Minimal-1511.iso",
         "iso_md5": "88c0437f0a14c6e2c94426df9d43cd67",
         "dst_iso": "/home/ubuntu/build/ms-centos-7.iso",
         "user": "mirantis",
         "password": "mirantis"
     }
     EOF

#. Build an ISO image using the specified parameters in ``parameters.json``:

   ::

     ~/packer build -var-file ~/parameters.json -only qemu centos7.json

   If you used the parameters from the example above, the created ISO image
   will be placed in ``~/build/ms-centos-7.iso``

#. Deploy an OSS Tooling appliance using the created ISO image.

