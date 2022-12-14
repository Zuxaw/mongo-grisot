resource "aws_docdb_cluster" "mongodb" {
  cluster_identifier = "mongodb-cluster"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
  master_username = "isen"
  master_password = "willylebest"

  # Configure the cluster to use the MongoDB 3.6 compatibility mode
  engine_version ="3.6.0"
  final_snapshot_identifier = "mongodb-final-snapshot"
}


#Create the VPC
resource "aws_vpc" "mongodb" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "mongodb-vpc"
  }
}

# Create a security group for the MongoDB cluster
resource "aws_security_group" "mongodb" {
  name = "mongodb-sg"
  description = "Security group for MongoDB cluster"
  vpc_id = aws_vpc.mongodb.id

  # Allow incoming traffic on the default MongoDB port (27017)
  ingress {
    from_port = 27017
    to_port = 27017
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_docdb_cluster_parameter_group" "mongodb" {
  name        = "mongodb-cluster-pg"
  family      = "docdb3.6"
  description = "Parameter group for MongoDB cluster"

  parameter {
    name  = "tls"
    value = "disabled"
  }
}


resource "aws_docdb_cluster_instance" "mongodb" {
  count = 3
  cluster_identifier = aws_docdb_cluster.mongodb.id
  instance_class = "db.t3.medium"
  preferred_maintenance_window = "Sun:03:00-Sun:04:00"
  apply_immediately = true

  availability_zone = ["us-east-1a", "us-east-1b", "us-east-1c"][count.index]
}
