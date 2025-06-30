package com.clearhire.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.clearhire.backend.models.User;
public interface UserRepository extends MongoRepository<User, String> {

    
}
