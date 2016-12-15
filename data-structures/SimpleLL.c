#include <stdio.h>
#include <stdlib.h>

//define node structure
struct node{
int data;
struct node *next;
};

int main(void) {
	//Node pointers
	struct node *head = NULL; //self-referencing pointers
	struct node *second = NULL;
	struct node *third = NULL;
	
	//Allocate memory to your nodes in the heap
	/*Note that malloc returns a pointer to the block of memory it allocates.
	The pointer must be of the data type to which the memory was assigned.*/
	head =(struct node*)malloc(sizeof(struct node));
	second = (struct node*)malloc(sizeof(struct node));
	third = (struct node*)malloc(sizeof(struct node));
	
	head->data = 23;
	//head's next should point to where second is pointing
	head->next = second;
	
	second->data = 8;
	second->next = third;
	
	third->data = 234;
	//third is the last node in the list
	third->next = NULL;
	return 0;
}
