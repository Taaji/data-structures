#include <stdio.h>
#include <stdlib.h>

//define node structure
struct node{
int data;
struct node *next;
};

struct node* buildList(){
	//Node pointers
	struct node *head = NULL; //self-referencing pointers
	struct node *second = NULL;
	struct node *third = NULL;
	//Notice fourth has not been initialized to NULL. Not making any difference as of now.
	struct node *fourth;
	
	//Allocate memory to your nodes in the heap
	/*Note that malloc returns a pointer to the block of memory it allocates.
	The pointer must be of the data type to which the memory was assigned.*/
	head =(struct node*)malloc(sizeof(struct node));
	second = (struct node*)malloc(sizeof(struct node));
	third = (struct node*)malloc(sizeof(struct node));
	fourth = (struct node*)malloc(sizeof(struct node));
	
	head->data = 23;
	//head's next should point to where second is pointing
	head->next = second;
	
	second->data = 8;
	second->next = third;
	
	third->data = 234;
	third->next = fourth;
	
	fourth->data = 345;
	fourth->next = NULL;
	
	return head;
}

/*listLength is passed a copy of the variable head. So, it contains it's own copy of head. Note that the
entire linked list is not copied.*/
int listLength(struct node *head1){
	struct node *current = head1; //current points to the same thing as head1(which is a copy of head) is pointing to.
	int counter = 0;
	while(current != NULL){
		current = current -> next;
		counter += 1;
	}
	/*Setting head1 to NULL does not affect the head variable passed to listLength when it is called. This
	is because head1 is just a copy of head and it is local to listLength.*/
	head1 = NULL;
	return counter;
}

void addNodeAtStart(){
	struct node *head = buildList();
	
	struct node *newNode;
	newNode = (struct node *)malloc(sizeof(struct node));
	newNode -> data = 384;
	newNode -> next = head; //newnode should point to where head is pointing.
	head = newNode; //newNode becomes the head of the list.
	
	int len = listLength(head);
	printf("\nLength of list : %d", len);
}

int main(void) {
	//Add node to start of list.
	addNodeAtStart();

	return 0;
}

