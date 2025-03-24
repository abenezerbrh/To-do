# Create your views here.
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Task

# Display the tasks
def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/task_list.html', {'tasks': tasks})

# Create a new task
def add_task(request):
    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        Task.objects.create(title=title, description=description)
        return redirect('task_list')

# Mark a task as completed
def complete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.status = 'completed'
    task.save()
    return JsonResponse({'status': 'completed'})

# Delete a task
def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return JsonResponse({'status': 'deleted'})
