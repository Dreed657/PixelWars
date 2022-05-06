# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.ssh.insert_key = false

  config.vm.define "server" do |server|
    server.vm.box = "williamyeh/ubuntu-trusty64-docker"
    server.vm.hostname = "pixelwars.server"
    server.vm.provider "virtualbox" do |vb|
      vb.memory = 2048
      vb.cpus = 4
    end
    server.vm.network "private_network", ip: "192.168.56.100"
  end
end
