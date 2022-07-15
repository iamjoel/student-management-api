import { Injectable } from '@nestjs/common';
import { RO } from '../../declarations/service';

let i = 1;
let list = [
  {
    id: i,
    name: '张三'
  }
]

@Injectable()
export class StudentService {
  list(name?: string) {
    return {
      code: 0,
      data: {
        list: name ? list.filter(item => item.name.includes(name)) : list
      }
    }
  }

  detail(id: number): RO {
    return {
      code: 0,
      data: list.find(item => item.id === id) || 'Not Found'
    }
  }

  create(name: string): RO {
    const id = ++i
    list.push({
      id,
      name
    })
    return {
      code: 0,
      data: {
        id
      }
    }
  }

  update(id: number, name: string): RO {
    list = list.map(item => {
      if(item.id === id) {
        return {
          ...item,
          name
        }
      }
    })
    return {
      code: 0
    }
  }

  delete(id: number): RO {
    list = list.filter(item => item.id !== id)
    return {
      code: 0
    }
  }
}