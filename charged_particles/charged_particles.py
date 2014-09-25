#!/usr/bin/python

import numpy as np

class Particle(object):
    
    dimension = 2
    
    def __init__(self, position, charge):
        self.position = position
        self.charge = charge
        self.forceVector = np.zeros((self.dimension))
        
    def updateForceVector(self, forceVector):
        self.forceVector = [x+y for x,y in zip(forceVector, self.forceVector)]
        
    def calculateNewPosition(self):
        self.position = [x+y for x,y in zip(self.position, self.forceVector)]
        self.forceVector = [0 for x in self.forceVector]

    
def calculateDirection(p1, p2):
    direction = calculateDistance(p1.position, p2.position)
    length = np.linalg.norm(direction)
    newDirection = [tmp/length for tmp in direction]
    return newDirection
    
def calculateDistance(pos1, pos2):
    direction = pos1[:]
    i=0
    for tmp in direction:
        direction[i] = float(pos2[i]-pos1[i])
        i+=1
    return direction
    
def calculateForce(p1, p2):
    const = -1
    tmp = calculateDistance(p1.position, p2.position)
    distance = calculateVectorLength(tmp)
    c = const*p1.charge*p2.charge/(distance*distance)
    return c
    
def calculateVectorLength(v):
    return np.linalg.norm(v)
        
def calculateForceVector(direction, force):
    return [x*force for x in direction]

        
"""
Test the file with this piece of code here
"""

p1 = Particle([0,0], 1)
p2 = Particle([0,1], 1)
direction = calculateDirection(p1, p2)
print "Direction: ", direction
force = calculateForce(p1, p2)
print "Force: ", force
forceVector = calculateForceVector(direction, force)
print "Force vector: ", forceVector
p1.updateForceVector(forceVector)
p1.calculateNewPosition()
print p1.position
print p1.forceVector

print
print
print "with list:"
print
print
particles = [Particle([0,0], 1), Particle([1,0], 1), Particle([0,1], 1)]
for k in range(10):    
    for p in particles:
        for p2 in particles:
            if p != p2:
                direction = calculateDirection(p, p2)
                force = calculateForce(p, p2)
                forceVector = calculateForceVector(direction, force)
                p.updateForceVector(forceVector)
        
    for p in particles:
        p.calculateNewPosition()
        print p.position
        
