
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";

interface PortfolioGroup {
  id: string;
  name: string;
  startMargin: number;
  perValue: number;
  maxHolding: number;
}

const initialGroups: PortfolioGroup[] = [
  {
    id: "group-1",
    name: "Growth Stocks",
    startMargin: 5000,
    perValue: 1000,
    maxHolding: 5,
  },
  {
    id: "group-2",
    name: "Dividend Portfolio",
    startMargin: 10000,
    perValue: 2000,
    maxHolding: 8,
  },
];

export function PortfolioManagement() {
  const [groups, setGroups] = useState<PortfolioGroup[]>(initialGroups);
  const [editingGroup, setEditingGroup] = useState<PortfolioGroup | null>(null);
  
  const handleAddGroup = () => {
    const newGroup: PortfolioGroup = {
      id: `group-${Date.now()}`,
      name: `New Group`,
      startMargin: 5000,
      perValue: 1000,
      maxHolding: 5,
    };
    
    setGroups([...groups, newGroup]);
    setEditingGroup(newGroup);
  };
  
  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
    
    if (editingGroup && editingGroup.id === id) {
      setEditingGroup(null);
    }
  };
  
  const handleEditGroup = (group: PortfolioGroup) => {
    setEditingGroup(group);
  };
  
  const handleSaveGroup = (updatedGroup: PortfolioGroup) => {
    setGroups(groups.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
    setEditingGroup(null);
  };
  
  const handleCancelEdit = () => {
    setEditingGroup(null);
  };
  
  const handleSaveChanges = () => {
    // In a real app, we would save to local storage or backend
    console.log("Saving portfolio groups:", groups);
  };
  
  return (
    <div className="container max-w-4xl py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Portfolio Management</h1>
        <Button onClick={handleAddGroup}>Add Group</Button>
      </div>
      
      <div className="grid gap-6">
        {groups.map(group => (
          <GroupCard 
            key={group.id}
            group={group}
            isEditing={editingGroup?.id === group.id}
            onEdit={() => handleEditGroup(group)}
            onDelete={() => handleDeleteGroup(group.id)}
            onSave={handleSaveGroup}
            onCancel={handleCancelEdit}
          />
        ))}
      </div>
      
      {groups.length > 0 && (
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveChanges}>
            Save All Changes
          </Button>
        </div>
      )}
      
      {groups.length === 0 && (
        <Card className="border border-dashed border-muted-foreground/20 text-center py-12">
          <p className="text-muted-foreground mb-4">No portfolio groups defined</p>
          <Button onClick={handleAddGroup} variant="outline">
            Add Your First Group
          </Button>
        </Card>
      )}
    </div>
  );
}

interface GroupCardProps {
  group: PortfolioGroup;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (group: PortfolioGroup) => void;
  onCancel: () => void;
}

function GroupCard({ 
  group, 
  isEditing, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel 
}: GroupCardProps) {
  const [editedGroup, setEditedGroup] = useState<PortfolioGroup>({...group});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setEditedGroup({
      ...editedGroup,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedGroup);
  };
  
  return (
    <Card className="animate-scale-in" animation={isEditing ? "none" : "hover"}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-lg">Edit Group</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <label className="block text-sm font-medium">
              Group Name
              <input 
                type="text"
                name="name"
                value={editedGroup.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
                required
              />
            </label>
            
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block text-sm font-medium">
                Start Margin
                <input 
                  type="number"
                  name="startMargin"
                  value={editedGroup.startMargin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
                  required
                  min="0"
                />
              </label>
              
              <label className="block text-sm font-medium">
                Per Value (RULE-001)
                <input 
                  type="number"
                  name="perValue"
                  value={editedGroup.perValue}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
                  required
                  min="0"
                />
              </label>
              
              <label className="block text-sm font-medium">
                Max Holding (RULE-002)
                <input 
                  type="number"
                  name="maxHolding"
                  value={editedGroup.maxHolding}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
                  required
                  min="1"
                />
              </label>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save Group
            </Button>
          </CardFooter>
        </form>
      ) : (
        <>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onEdit}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onDelete}
                  className="h-8 w-8 p-0 rounded-full text-negative"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H4V12C4 12.5523 4.44772 13 5 13H10C10.5523 13 11 12.5523 11 12V6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H3.5ZM5 6H10V12H5V6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground mb-1">Start Margin</dt>
                <dd className="font-medium">${group.startMargin.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Per Value (RULE-001)</dt>
                <dd className="font-medium">${group.perValue.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Max Holding (RULE-002)</dt>
                <dd className="font-medium">{group.maxHolding}</dd>
              </div>
            </dl>
          </CardContent>
        </>
      )}
    </Card>
  );
}
