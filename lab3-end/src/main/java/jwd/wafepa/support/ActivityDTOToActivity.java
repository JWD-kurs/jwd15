package jwd.wafepa.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.web.dto.ActivityDTO;

@Component
public class ActivityDTOToActivity 
	implements Converter<ActivityDTO, Activity> {

	@Autowired
	private ActivityService activitySerivce;
	
	@Override
	public Activity convert(ActivityDTO dto) {
		Activity activity = null;
		
		if(dto.getId()!=null){
			activity = activitySerivce.findOne(dto.getId());
		}else{
			activity = new Activity();
		}
		
		activity.setId(dto.getId());
		activity.setName(dto.getName());
		
		return activity;
	}
	
	public List<Activity> convert(List<ActivityDTO> dtos){
		List<Activity> ret = new ArrayList<>();
		
		for(ActivityDTO dto: dtos){
			ret.add( convert(dto) );
		}
		
		return ret;
	}

}
