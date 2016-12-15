.. _deploy-oss-tooling:

Deploy an OSS Tooling framework
===============================

After you obtain a Mirantis OSS Tooling ISO image, you can deploy the
Mirantis OSS Tooling framework.

The Mirantis OSS Tooling framework runs on core nodes.
Although for testing purposes, one core node is sufficient, for production
environment, deploy at least 3 virtual or physical core nodes.

You will also need a machine from which you configure core nodes after
installing the base operating system. This machine sometimes
called deployment node. A deployment node must run Ubuntu 14.04 or later
or CentOS 7. If you do not have such machine at hand, you may use the
Mirantis OSS Tooling ISO image to deploy one. After installing and
configuring the Mirantis OSS Tooling framework, the deployment node
does not participate in the framework lifecycle. Therefore, you can use
your laptop or any other machine as deployment node.

This section includes the following topics:

* :ref:`hard-soft-reqs`
* :ref:`prepare-deployment-node`
* :ref:`deploy-base-os-core-nodes`
* :ref:`assign-node-roles`
* :ref:`configure-core-nodes`

.. _hard-soft-reqs:

Hardware and software requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Your environment must meet the following requirements:

* **Deployment node**

  * Operating system: Ubuntu 16.04 or CentOS 7 (You can install CentOS 7
    from the same pre-build ISO or use your own system)
  * RAM: 2+ GB
  * Network: 1 GbE network interface with network connectivity to data nodes
  * Disk: 20+ GB of free space

* **Core node**

  * Operating system: empty, will be installed from the ISO.
  * RAM: 4+ GB
  * Network: 1 GbE network interface
  * Disk: 20+ GB of free space

.. _prepare-deployment-node:

Prepare a deployment node
~~~~~~~~~~~~~~~~~~~~~~~~~

You can prepare a deployment node in advance and use the configuration to set
up core nodes later. For example, if you need to deploy the Mirantis OSS
Tooling framework in a facility without an Internet connection, you can
create a required configuration in your office on your laptop and later
bootstrap the configuration in the facility. In this case, your laptop
becomes a deployment node. Therefore it must meet the requirements listed
in :ref`hard-soft-reqs`.

The task described in this section requires an Internet connection.

**To prepare a deployment node:**

#. Log in to the deployment node.
#. Clone the ``automation`` repository:

   :: 

     git clone https://github.com/seecloud/automation

#. Change the directory to the newly created ``automation`` directory.
#. Download all the required images for deployment by running the
   ``bootstrap-runner.yml`` Ansible Playbook:

   ::

     ansible-playbook -i inventory/bootstrap.cfg bootstrap-runner.yml

#. Proceed to :ref:`deploy-base-os-core-nodes`.

.. _deploy-base-os-core-nodes:

Provision the base operating system on core nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Data nodes will run all required tools and services for remote management
of OpenStack environments. Your data nodes must meet requirements listed
in :ref:`hard-soft-reqs`. Use the Mirantis OSS Tooling ISO that
you have built as described in :ref:`build-oss-image` or the one you
have obtained from the automatic build system.

You must deploy at least three nodes to ensure high-availability and
fault tolerance of your system.

**To the base operating system on Data nodes:**

#. Make the ISO available to the servers which you plan to use as Data
   nodes by creating a USB drive with the ISO image or by uploading the
   ISO image to a server and make it available through the IPMI.

#. Boot the required physical or virtual machines.

   The operating system installs automatically with the pre-configured
   settings.

   If you use virtual machines, you can deploy one machine and then create
   two clones of that machine.

   note:
      Username: mirantis
      Password: mirantis

#. Proceed to :ref:`assign-node-roles`

.. _assign-node-roles:

Assign node roles
~~~~~~~~~~~~~~~~~

Before you run a deployment, you must assign roles to core nodes.
A role determines what processes a core node runs. 

If you use DHCP in this network during the provisioning,
nodes will try to obtain IP addresses automatically. 
If you do not use DHCP, you must log in to the nodes
and assign available static IP addresses. 

**To assign node roles:**:

#. Log in to the deployment node.
#. Assign node roles: 

   ::

     utils/inventory-generator --nodes \
       node1[ansible_ssh_host=<node1-ip>] \
       node2[ansible_ssh_host=<node2-ip>] \
       node3[ansible_ssh_host=<node3-ip>]

   The command generates the ``inventory.cfg`` file.

#. Proceed to :ref:`configure-core-nodes`.

.. _configure-core-nodes:

Configure core nodes
~~~~~~~~~~~~~~~~~~~~

After you provision core nodes and assign roles, you must
configure a specific set of packages that you have previously
downloaded on your deployment node as described in
:ref:`prepare-deployment-node`. The ``inventory/inventory.cfg``
file must be present on the deployment node.

The task described in this section does not require an Internet
connection.

**Configure core nodes:**

#. Log in to the deployment node.
#. Deploy the configuration on all core nodes using the
   ``ansible-playbook`` command:

   ::

     ansible-playbook -i inventory/inventory.cfg automation-runner.yml
