export interface List {
  task_id: string;
  task: string;
  status: string;
}

export interface Letter {
  letter_id: string;
  letter_title: string;
  letter_content: string;
  recipient: string;
  sender: string;
  date_sent: string;
}
