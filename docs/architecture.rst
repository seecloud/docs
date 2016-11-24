.. _oss-architecture:

OSS Architecture Overview
=========================

This document includes the following sections:

* :ref:`arch-layers`
* :ref:`arch-infra-components`

.. _arch-layers:

Architecture Layers
~~~~~~~~~~~~~~~~~~~

#. Environment - OSS Tooling is going to run on top of VMs or Baremetal nodes
   that run MS ISO that contains everything that runs on host level
   pre-installed, this allows us to:

        #. Boostrap OSS Tooling infrastructure without internet
        #. Have pretty simple & automated initial deployment procedure
        #. Reinstall host nodes with new ISO when they are released
                   (security updates)

#. Infrastructure - Goal of this level is to provide everything required to run
   containers on host system. It should provide at least docker, shared file
   system (Glusterfs) and HA.

#. Data Stores - Only services from this level, should deal with real data (be
   state full), those require more testing including scalability, performance
   and HA, DR.

#. Core Services - This is list of services required to implement Microservices
   approach. These services usually don't have direct ad-value for customer and
   are heavily used by microservices of higher levels.

#. Backend - This level basically implement all OSS Tooling functionality. Each
   service provides.

#. Frontend - Provides UI and Rest API to end users with granular access to
   different part of MS Tooling.

The described layers above are figured on the next picture:

    .. image:: ../images/ms-oss-tooling-arch.png

.. _arch-infra-components:

Infrastructure Components
~~~~~~~~~~~~~~~~~~~~~~~~~

#. Ansible

    Ansible in conjuction with the automation deployment playbooks is used for
    initial deploymen of OSS Tools and comes as a part of OSS ISO.

#. Docker

    Docker is going to be used for all services used by all OSS Tools. Each
    service has own pre-built image which is stored into private
    docker-registry. Docker is shipped with OSS ISO and automatically
    configured during the deployment.

#. Docker Registry

    Docker Registry is used for all images of all services, configured in
    HA-mode across the deployment nodes.

#. Kubernetes

    Kubernetes is responsible for automating deployment, scaling and lice cycle
    management operations of OSS services across cluster of pre-deployed hosts.

#. ElasticSearch

    ElasticSearch is used for storing searchable metrics and probes which are
    used by OSS Tools services, configured in the clustered mode during
    the deployment.
